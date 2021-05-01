import React, {Component} from "react";
import {Link} from "react-router-dom";
import contact_us from './contact_us.png';
import email from './email.png';

class Contact extends Component {

    render() {
        return (
            <div className="AboutContact">
                <body>
                <nav>
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="checkBtn">
                        <i className="fas fa-bars"/>
                    </label>
                    <label className="logo">Virtual Lab</label>
                </nav>
                <div className="About">
                    <div className="container">
                        <div className="item">
                            <h1>Vinayak Chaturvedi</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>9406926901</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>vinayak.chaturvedi96@gmail.com</p>
                            </div>
                        </div>
                        <div className="item">
                            <h1>Rushikesh Jachak</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>9424542771</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>rushikesh@gmail.com</p>
                            </div>
                        </div>
                        <div className="item">
                            <h1>Swapnil Jain</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>8017961092</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>swapnil@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
            </div>
        )
    }
}

export default Contact