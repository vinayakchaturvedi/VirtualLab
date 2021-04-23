import React from "react";
// import loginImg from "../../login.svg";
import imglog from "../../llo.png";
import "./style.scss";
import {withRouter} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            loginType: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    async saveUser() {
        console.log(this.state.loginType)
        if (this.state.loginType === "Student") {
            let response = await fetch('http://localhost:8700/addStudent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    studentName: this.state.name,
                    password: this.state.password,
                    emailId: this.state.email
                })
            });

            if (response.status === 200) {
                let student = await response.json();
                console.log("Successfully registered the student: ", student);
            } else {
                console.log("Error while registering the student");
            }
        }

        if (this.state.loginType === "Faculty") {
            let response = await fetch('http://localhost:8700/addFaculty/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    facultyName: this.state.name,
                    password: this.state.password,
                    emailId: this.state.email
                })
            });

            if (response.status === 200) {
                let faculty = await response.json();
                console.log("Successfully registered the faculty: ", faculty);
                this.props.history.push({
                    pathname: '/FacultyHome',
                    faculty: faculty
                })
            } else {
                console.log("Error while registering the faculty");
            }
        }
    }

    render() {
        return (<div>
                <div className="base-container" ref={this.props.containerRef}>
                    <div className="navbar-content">
                        <h1>Virtual Lab</h1>
                    </div>
                    <div className="content">
                        <div className="image">
                            <img src={imglog} alt="Virtal Labs"/>
                        </div>
                        <div className="form">
                            <div className="form-radio">
                                {/*<label htmlFor="selectType">Select Type</label>*/}
                                <input
                                    type="radio" value="Faculty" name="loginType"
                                    onChange={this.handleChange}
                                    checked={this.state.loginType === "Faculty"}
                                /> Faculty
                                <input
                                    type="radio" value="Student" name="loginType"
                                    onChange={this.handleChange}
                                    checked={this.state.loginType === "Student"}
                                /> Student
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Enrollment Number</label>
                                <input value={this.state.username}
                                       onChange={this.handleChange}
                                       type="text" name="username" placeholder="Enrollment Number"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Name</label>
                                <input value={this.state.name}
                                       onChange={this.handleChange}
                                       type="text" name="name" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input value={this.state.email}
                                       onChange={this.handleChange}
                                       type="email" name="email" placeholder="Email"/>
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
                            Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);