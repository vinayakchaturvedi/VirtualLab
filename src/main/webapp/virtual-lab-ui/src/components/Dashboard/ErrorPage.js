import React, {Component} from "react";
import "../../assets/css/error-page.css"
import {Link} from "react-router-dom";


class ErrorPage extends Component {


    render() {
        return (
            <div className="Error404">
                <body>
                <div className="mainBox">
                    <div className="err">4</div>
                    <i className="far fa-question-circle fa-spin"></i>
                    <div className="err2">4</div>
                    <div className="msg">UH OH! Something is not right. May be this page is hiding out in quarantine? Or
                        you are trying to reach this page without log in
                        <p>Let's go <Link to="/">Home</Link> and try from there.</p></div>
                </div>
                </body>
            </div>
        )
    }
}

export default ErrorPage