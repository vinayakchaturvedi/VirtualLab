import React, {Component} from "react";
import {Link} from "react-router-dom";

class About extends Component {

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
                    <h2>Virtual lab is a simulated learning environment that allow students to complete computer science
                        laboratory exercises online and explore concepts and theories without stepping into a physical
                        lab.</h2>
                    <div className="container">
                        <div className="item">
                            <h1>Vinayak Chaturvedi</h1>
                            <br/>
                            <p>
                                Vinayak is currently pursuing MTech in CSE at International Institute of Information
                                Technology, Bangalore. He has 2 years of industry experience, worked as a Java developer
                                at Goldman Sachs and involved in various Financial Institution projects with hands on
                                experience on various devops tools including Docker, Ansible, Kafka, JMS, Jenkins,
                                Gradle, Maven, Version Control (Git, Subversion) and worked on various frameworks
                                including React, Spring rest, Hibernate, and worked on Oracle, Sybase, DB2 RDBMS.
                            </p>
                        </div>
                        <div className="item">
                            <h1>Rushikesh Jachak</h1>
                            <br/>

                        </div>
                        <div className="item">
                            <h1>Swapnil Jain</h1>
                            <br/>
                            <p>
                                Swapnil is currently pursuing MTech in CSE at International Institute of Information
                                Technology, Bangalore. He is a fresher in the industry and have hands on experience on
                                various devops tools including Docker, Ansible,Jenkins, Maven, Version Control (Git, Subversion)
                                and worked on various frameworks including React, Springboot and worked on MySQL,Oracle.
                            </p>
                        </div>
                    </div>
                </div>
                </body>
            </div>
        )
    }
}

export default About