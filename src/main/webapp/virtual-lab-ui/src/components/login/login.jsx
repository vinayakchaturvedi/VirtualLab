import React from "react";
// import loginImg from "../../login.svg";
import imglog from "../../llo.png";


export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveUser=this.saveUser.bind(this);
        this.verifyUser = this.verifyUser.bind(this);

    }
    verifyUser()
    {  if(this.state.username === "swapnil" && this.state.password ==="admin")
       {console.log("Bhai aa gaya");  }
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
        console.log('User =>' + JSON.stringify(user));
    }
    render() {
        return (
            <div>
                <div className="navbar-content">
                    <h1>Virtual Lab</h1>
                </div>
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={imglog} alt="Virtual Lab" />
                    </div>
                    <div className="form">
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