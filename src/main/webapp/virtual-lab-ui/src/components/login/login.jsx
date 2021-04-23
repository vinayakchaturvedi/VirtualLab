import React from "react";
// import loginImg from "../../login.svg";
import imglog from "../../llo.png";
// import { Redirect } from "react-router-dom";


export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isAuth:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser=this.saveUser.bind(this);
        this.verifyUser = this.verifyUser.bind(this);

    }
     async verifyUser()
    {   if(document.getElementById("studentLogin").checked === true) {
        console.log("Ye Student ka Elaka hai");
        //API Call to get student ID for login verification
        let response = await fetch('http://localhost:8700/getStudent/'+this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            }
        });

        let result=await response.json();
        console.log(result);
        console.log("Student ID is:"+result.id);
        console.log("Student FirstName is:"+result.firstName);
        console.log("Student FirstName is:"+result.lastName);
        console.log("Student Contact Number is:"+result.contactNumber);
        }

        else if (document.getElementById("facultyLogin").checked === true) {
        console.log("Ye faculty ka Elaka hai");
        //API Call to get faculty ID for login verification
        let response = await fetch('http://localhost:8700/getFaculty/'+this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            }
        });
        let result=await response.json();
        console.log(result);
        console.log("Faculty ID is:"+result.id);
        console.log("Faculty FirstName is:"+result.firstName);
        console.log("Faculty FirstName is:"+result.lastName);
        console.log("Faculty Contact Number is:"+result.contactNumber);
        }
        else
        { alert("select type of Login");}

        //checking the user exist or not
         if(this.state.username === "1" && this.state.password ==="root")
         {   this.state.isAuth=true;
             console.log("Login status:"+this.state.isAuth);
             // console.log("Bhai aa gaya");
             // if(this.state.isAuth)
             // {
             //     // console.log("Bawa tum chl kyo nahi rahe");
             //     return  <Redirect to="/terminal" /> }
         }
         else {
           console.log("Login status:"+this.state.isAuth);
         }
         // console.log(this.state.isAuth);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    saveUser=(e)=> {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password,}
        console.log(user.username);
         console.log(user.password);
        this.verifyUser();
        // console.log('User =>' + JSON.stringify(user));
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
                        <img src={imglog} alt="Virtual Lab" />
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
                                   type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={this.state.password}
                                   onChange={this.handleChange}
                                   type="password" name="password" placeholder="Password" />
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