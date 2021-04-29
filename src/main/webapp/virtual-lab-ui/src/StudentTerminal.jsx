import React, {Component} from 'react';
import Terminal from 'terminal-in-react';
import {Link} from "react-router-dom";

// import 'terminal-in-react/lib/css/index.css';
class StudentTerminal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: this.props.location.student,
            lab: this.props.location.lab,
            commandToExecute: "",
            output: "",
            showTextBox: false,
            textBoxContent: ""
        }
        this.execCommandOnServer = this.execCommandOnServer.bind(this)
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.getContentFromBackEnd = this.getContentFromBackEnd.bind(this)
    }

    componentDidMount() {
        if (this.state.student === undefined) {
            this.setState({
                student: JSON.parse(localStorage.getItem('student')),
                lab: JSON.parse(localStorage.getItem('lab')),
                isLoading: false
            })
        } else {
            localStorage.setItem('student', JSON.stringify(this.state.student));
            localStorage.setItem('lab', JSON.stringify(this.state.lab));
            this.setState({
                isLoading: false
            })
        }
    }

    async getContentFromBackEnd() {

        let commandToExecute = 'viRead ' + this.state.commandToExecute.split(" ")[1];
        let response = await fetch('http://localhost:8700/execCommand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                command: commandToExecute,
                userName: this.state.student.userName,
                labName: this.state.lab.labName
            })
        })
        if (response.status === 200) {
            let output = await response.json()
            this.setState({
                showTextBox: true,
                textBoxContent: output.result
            })
        }
    }

    async submit() {
        console.log(this.state.textBoxContent.replaceAll(" ", "\\"));

        let commandToExecute = 'viWrite ' + this.state.commandToExecute.split(" ")[1] + ' ' + this.state.textBoxContent;

        this.setState({
            isLoading: true
        })
        let response = await fetch('http://localhost:8700/execCommand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                command: commandToExecute,
                userName: this.state.student.userName,
                labName: this.state.lab.labName
            })
        }).then(this.setState({
            isLoading: false
        }));

        while (this.state.isLoading) {
        }
        console.log(response);
        this.setState({
            backendResponse: await response.json(),

        }, () => this.setState({
            output: this.state.backendResponse.result,
            showTextBox: false,
            textBoxContent: ""
        }, () => console.log(this.state.output)))
    }

    async execCommandOnServer() {
        console.log("Executing following command: " + this.state.commandToExecute)
        if (this.state.commandToExecute.startsWith("vi")) {
            await this.getContentFromBackEnd();
            return;
        }

        this.setState({
            isLoading: true
        })
        let response = await fetch('http://localhost:8700/execCommand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                command: this.state.commandToExecute,
                userName: this.state.student.userName,
                labName: this.state.lab.labName
            })
        }).then(this.setState({
            isLoading: false
        }));

        while (this.state.isLoading) {
        }
        console.log(response);
        this.setState({
            backendResponse: await response.json(),

        }, () => this.setState({
            output: this.state.backendResponse.result
        }, () => console.log(this.state.output)))
    }

    async handleChange(event) {
        if (event === undefined) return;

        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    logout() {
        localStorage.removeItem('student');
        localStorage.removeItem('lab');
    }

    render() {
        return (
            <div className="StudentTerminal">
                <div className="NAV">
                    <nav>
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check" className="checkBtn">
                            <i className="fas fa-bars"/>
                        </label>
                        <label className="logo">Virtual Lab</label>
                        <ul>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/">Services</Link></li>
                            <li><Link to="/">Contact</Link></li>
                            <li><Link to="/" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </nav>
                </div>
                <div
                    style={{
                        display: this.state.showTextBox ? "flex" : "none",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh"
                    }}
                >
                    <textarea
                        name="textBoxContent"
                        required="True"
                        placeholder="Write your text here"
                        value={this.state.textBoxContent}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.submit} className="CreateLab">Submit</button>
                </div>
                <div
                    style={{
                        display: this.state.showTextBox ? "none" : "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh"
                    }}
                >
                    <Terminal
                        color='green'
                        backgroundColor='black'
                        barColor='black'
                        style={{fontWeight: "bold", fontSize: "1em"}}

                        commands={{
                            execCommand: {
                                method: (args, print, runCommand) => {
                                    //this.execCommandOnServer(${args._[0]})
                                    let cmd = '';
                                    for (let index = 0; index < `${args._["length"]}`; index++) {
                                        cmd = cmd + (`${args._[index]}`) + " ";
                                    }
                                    this.setState({
                                        commandToExecute: cmd,
                                    }, () => {
                                        print("Please wait!!! We are executing your command")
                                        this.execCommandOnServer().then(r => print(this.state.output))
                                    })

                                },
                            },
                        }}
                        descriptions={{
                            execCommand: 'this will execute command run by student'
                        }}
                        msg='Please specify you command like: "execCommand ls"'
                    />
                </div>
            </div>
        );
    }
}

export default StudentTerminal;
