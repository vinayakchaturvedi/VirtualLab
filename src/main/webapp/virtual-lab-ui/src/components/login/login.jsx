import React from "react";
// import loginImg from "../../loginHook.svg";
import imglog from "../../llo.png";
import "./style.scss";
import {withRouter} from 'react-router-dom';

// import { Redirect } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isAuth: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.verifyUser = this.verifyUser.bind(this);

    }

    async verifyUser() {
        if (document.getElementById("studentLogin").checked === true) {
            console.log("Verifying student");
            //API Call to get student ID for loginHook verification
            let response = await fetch('http://localhost:8700/verifyStudentLogin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    password: this.state.password
                })
            });

            if (response.status === 200) {
                let result = await response.json();
                console.log(result);
                this.props.history.push({
                    pathname: '/dashboard',
                    state: {student: result}
                })
            }
        } else if (document.getElementById("facultyLogin").checked === true) {
            console.log("Verifying faculty");
            //API Call to get faculty ID for loginHook verification
            let response = await fetch('http://localhost:8700/verifyFacultyLogin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    password: this.state.password
                })
            });
            if (response.status === 200) {
                let result = await response.json();
                console.log(result);
                this.props.history.push({
                    pathname: '/admin',
                    faculty: result
                })
            }
        } else {
            alert("select type of Login");
        }

        //checking the user exist or not
        if (this.state.username === "1" && this.state.password === "root") {
            this.state.isAuth = true;
            console.log("Login status:" + this.state.isAuth);
        } else {
            console.log("Login status:" + this.state.isAuth);
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password,}
        console.log(user.username);
        console.log(user.password);
        this.verifyUser();
    }

    render() {
        return (
            <div>

                <div className="base-container" ref={this.props.containerRef}>
                    <div className="navbar-content">
                        <h1>Virtual Lab</h1>
                    </div>
                    <div className="content">
                        <div className="image">
                            <img src={imglog} alt="Virtual Lab"/>
                        </div>
                        <div className="form">
                            <div className="form-radio">
                                {/*<label htmlFor="selectType">Select Type</label>*/}
                                <input type="radio" value="Faculty" id="facultyLogin" name="loginType"/> Faculty
                                <input type="radio" value="Student" id="studentLogin" name="loginType"/> Student
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input value={this.state.username}
                                       onChange={this.handleChange}
                                       type="text" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input value={this.state.password}
                                       onChange={this.handleChange}
                                       type="password" name="password" placeholder="Password"/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={this.saveUser} className="btn">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);