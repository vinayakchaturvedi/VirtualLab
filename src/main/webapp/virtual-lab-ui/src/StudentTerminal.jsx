import React, {Component} from 'react';
import Terminal from 'terminal-in-react';

// import 'terminal-in-react/lib/css/index.css';
class StudentTerminal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: this.props.location.student,
            lab: this.props.location.lab,
            commandToExecute: "",
            output: ""
        }
        this.execCommandOnServer = this.execCommandOnServer.bind(this)
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


    async execCommandOnServer() {
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

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
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
                                }, () => console.log(this.state.commandToExecute))
                                this.execCommandOnServer().then(r => print(this.state.output))

                            },
                        },
                    }}
                    descriptions={{
                        execCommand: 'this will execute command run by student'
                    }}
                    msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
                />
            </div>


        );
    }
}

export default StudentTerminal;
