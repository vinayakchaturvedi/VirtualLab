import React from "react";
// import loginImg from "../../login.svg";
import imglog from "../../llo.png";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email:"",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser=this.saveUser.bind(this);
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    saveUser=(e)=> {
        e.preventDefault();
        let user = {username: this.state.username,email:this.state.email ,password: this.state.password,}
        console.log(user.username);
        console.log(user.password);
        console.log(user.email);
        console.log('User =>' + JSON.stringify(user));
    }
    render() {
        return ( <div>
                <div className="navbar-content">
                    <h1>Virtual Lab</h1>
                </div>
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={imglog} alt="Virtal Labs" />
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input value={this.state.username}
                                   onChange={this.handleChange}
                                   type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={this.state.email}
                                   onChange={this.handleChange}
                                   type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={this.state.password}
                                   onChange={this.handleChange}
                                   type="text" name="password" placeholder="Password" />
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