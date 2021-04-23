import React, {Component} from 'react';
import Terminal from 'terminal-in-react';

// import 'terminal-in-react/lib/css/index.css';
class StudentTerminal extends Component {
    constructor(props) {
        super();
        this.state = {
            command: "",
            output: ""
        }
        this.execCommandOnServer = this.execCommandOnServer.bind(this)
    }


    async execCommandOnServer(event) {
        //event.preventDefault();
        //event.stopPropagation();

        let response = await fetch('http://localhost:8700/execCommand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                command: this.state.command,
            })
        });
        console.log(response);

        this.setState({
            backendResponse: await response.json()
        }, () => this.setState({
            output: this.state.backendResponse.result
        }))
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
                                this.setState({
                                    command: `${args._[0]}`
                                })
                                this.execCommandOnServer()
                                print(this.state.output)
                            },
                            // options: [
                            //     {
                            //         name: 'color',
                            //         description: 'The color the output should be',
                            //         defaultValue: 'white',
                            //     },
                            // ],
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
