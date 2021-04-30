import React, {useState} from "react";
import "./style.scss";
import imgLog from "../../llo.png";
import Dashboard from "../../views/Dashboard/Dashboard";
import {withRouter} from "react-router-dom";

export default withRouter(function loginHook(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [student, setStudent] = useState({})
    const [faculty, setFaculty] = useState({})

    return (
        <div>

            <div className="base-container" ref={props.containerRef}>
                <div className="navbar-content">
                    <h1>Virtual Lab</h1>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={imgLog} alt="Virtual Lab"/>
                    </div>
                    <div className="form">
                        <div className="form-radio">
                            {/*<label htmlFor="selectType">Select Type</label>*/}
                            <input type="radio" value="Faculty" id="facultyLogin" name="loginType"/> Faculty
                            <input type="radio" value="Student" id="studentLogin" name="loginType"/> Student
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input value={username}
                                   onChange={e => {
                                        setUsername(e.target.value)
                                   }}
                                   type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password}
                                   onChange={e => {
                                       setPassword(e.target.value)
                                   }}
                                   type="password" name="password" placeholder="Password"/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" onClick={async e => {
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
                                    userName: username,
                                    password: password
                                })
                            });

                            if (response.status === 200) {
                                let result = await response.json();
                                console.log(result);
                                props.history.push({
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
                                    userName: username,
                                    password: password
                                })
                            });
                            if (response.status === 200) {
                                let result = await response.json();
                                console.log(result);
                            }
                        } else {
                            alert("select type of Login");
                        }
                    }} className="btn">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );

})