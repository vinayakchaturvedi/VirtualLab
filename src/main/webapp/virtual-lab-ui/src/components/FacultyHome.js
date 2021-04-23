import React, {Component} from "react";
import {Link} from "react-router-dom";

/**
 {
    "facultyId": 2,
    "userName": "T01",
    "facultyName": "R Thangaraju",
    "emailId": "Thangaraju@gmail.com",
    "password": "root",
    "labs": []
}
 */
class FacultyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faculty: this.props.location.faculty,
            isLoading: true,
            selectedLabForCreation: "",
            availableLabsForCreation: [],
            createLabMessage: "",
            createdLab: undefined,
            selectLabForAnalysis: "",
            availableLabsForAnalysis: [],
            availableLabsDetailsForAnalysis: undefined,
            analyze: false,
            studentUserName: "",
            studentResponse: undefined,
            studentSearchResponseMessage: "",
            foundStudent: false,
            studentResponseLabs: [],
        }

        this.handleChange = this.handleChange.bind(this)
        this.createLab = this.createLab.bind(this)
        this.analyzeLab = this.analyzeLab.bind(this)
        this.searchStudent = this.searchStudent.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {

        if (this.state.faculty === undefined) {
            this.setState({
                faculty: JSON.parse(localStorage.getItem('faculty')),
                isLoading: false
            })
        } else {
            localStorage.setItem('faculty', JSON.stringify(this.state.faculty));
            this.setState({
                isLoading: false
            })
        }

        //call backend and get list of available labs
        let response = await fetch('http://localhost:8700/findAllNonExistingLabs/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        });
        let status = response.status;
        let availableLabsForCreationTemp = [];
        if (status === 200) {
            availableLabsForCreationTemp = await response.json();
        }
        availableLabsForCreationTemp.unshift("Select the lab")
        this.setState({
            availableLabsForCreation: availableLabsForCreationTemp
        })

        let response2 = await fetch('http://localhost:8700/findAllLabs/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        });

        let status2 = response2.status;
        if (status2 === 200) {
            let availableLabsDetailsForAnalysisTemp = {};
            let availableLabsForAnalysisTemp = []
            let temp = await response2.json()
            temp.forEach(lab => {
                availableLabsDetailsForAnalysisTemp[lab.labName] = lab
                availableLabsForAnalysisTemp.push(lab.labName)
            })
            console.log("availableLabsDetailsForAnalysisTemp: ", availableLabsDetailsForAnalysisTemp["java"]);
            availableLabsForAnalysisTemp.unshift("Select the lab")
            this.setState({
                availableLabsDetailsForAnalysis: availableLabsDetailsForAnalysisTemp,
                availableLabsForAnalysis: availableLabsForAnalysisTemp
            })
        }
    }

    async handleChange(event) {
        if (event === undefined) return;

        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    async createLab() {
        if (this.state.selectedLabForCreation === "Select the lab") {
            this.setState({
                createLabMessage: "Please provide appropriate input"
            })
            return;
        }

        this.setState({
            createLabMessage: "Please wait! while we are creating your lab..."
        })

        let response = await fetch('http://localhost:8700/addLab/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                labName: this.state.selectedLabForCreation,
                studentsRegistered: 0,
                facultyId: this.state.faculty.facultyId
            })
        });
        let status = response.status;
        if (status === 200) {
            this.setState({
                createLabMessage: "Successfully created the lab",
                createdLab: await response.json()
            })
        } else {
            this.setState({
                createLabMessage: "Error while creating the lab",
            })
        }
    }

    analyzeLab() {
        this.setState({
            analyze: true
        })
    }

    async searchStudent() {
        let response = await fetch('http://localhost:8700/getStudentByUserName/' + this.state.studentUserName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        });
        let status = response.status;
        if (status === 200) {
            let studentResponse = await response.json();
            let studentResponseLabs = []
            studentResponse.labs.forEach(lab => {
                studentResponseLabs.push(lab)
            });

            this.setState({
                studentSearchResponseMessage: "Student Details:",
                studentResponse: studentResponse,
                foundStudent: true,
                studentResponseLabs: studentResponseLabs
            })
        } else {
            this.setState({
                studentSearchResponseMessage: "Student not found"
            })
        }
    }

    logout() {
        localStorage.removeItem('faculty');
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }

        const labListForCreation = this.state.availableLabsForCreation.map(item =>
            <option value={item}>
                {item}
            </option>
        )

        const labListForAnalysis = this.state.availableLabsForAnalysis.map(item =>
            <option value={item}>
                {item}
            </option>
        )

        let labsToShow = this.state.studentResponseLabs.map((lab) =>
            <p className="printDetails">{lab.labName}</p>
        )

        return (
            <div className="Home">
                <div className="NAV">
                    <nav>
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check" className="checkBtn">
                            <i className="fas fa-bars"/>
                        </label>
                        <label className="logo">Virtual Lab</label>
                        <ul>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/">Services</Link></li>
                            <li><Link to="/">Contact</Link></li>
                            <li><Link to="/" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="FacultyHome">
                    <h5 className="printDetails">Welcome back! {this.state.faculty.facultyName} Sir</h5>
                    <div className="container">
                        <div className="item">
                            <h4>Create new Lab</h4>
                            <div
                                className="labList">
                                <select
                                    name="selectedLabForCreation"
                                    value={this.state.selectedLabForCreation}
                                    onChange={this.handleChange}
                                >
                                    {labListForCreation}
                                </select>
                            </div>
                            <button onClick={this.createLab} className="CreateLab">Create Lab</button>
                            <p className="createLabMessage">{this.state.createLabMessage}</p>
                        </div>
                        <div className="item">
                            <h4>Analyze existing lab</h4>
                            <div
                                className="labList">
                                <select
                                    name="selectLabForAnalysis"
                                    value={this.state.selectLabForAnalysis}
                                    onChange={this.handleChange}
                                >
                                    {labListForAnalysis}
                                </select>
                            </div>
                            <button onClick={this.analyzeLab} className="CreateLab">Analyze
                            </button>
                            <div className="printDetailsDiv" style={{display: this.state.analyze ? "block" : "none"}}>
                                <div>
                                    <h5 className="printDetails">LabName: </h5>
                                    <p className="printDetails">{this.state.availableLabsDetailsForAnalysis === undefined ||
                                    this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis] === undefined ? "" :
                                        this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis].labName}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">Faculty Name: </h5>
                                    <p className="printDetails">{this.state.availableLabsDetailsForAnalysis === undefined ||
                                    this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis] === undefined ? "" :
                                        this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis].faculty.facultyName}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">Creation Date: </h5>
                                    <p className="printDetails">{this.state.availableLabsDetailsForAnalysis === undefined ||
                                    this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis] === undefined ? "" :
                                        this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis].creationDate}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">Total Students Registered: </h5>
                                    <p className="printDetails">{this.state.availableLabsDetailsForAnalysis === undefined ||
                                    this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis] === undefined ? "" :
                                        this.state.availableLabsDetailsForAnalysis[this.state.selectLabForAnalysis].studentsRegistered}</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <h4>View Student details</h4>
                            <div className="StudentDetails">
                                <label>Enter student's Enrollment number</label>
                                <input
                                    type="text"
                                    name="studentUserName"
                                    required="True"
                                    placeholder="Student User Name"
                                    value={this.state.studentUserName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button onClick={this.searchStudent} className="CreateLab">Search</button>
                            <div className="printDetailsDiv"
                                 style={{display: this.state.foundStudent ? "block" : "none"}}>
                                <div>
                                    <h5 className="printDetails">Student Name: </h5>
                                    <p className="printDetails">{this.state.studentResponse === undefined ? "" :
                                        this.state.studentResponse.studentName}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">User Name: </h5>
                                    <p className="printDetails">{this.state.studentResponse === undefined ? "" :
                                        this.state.studentResponse.userName}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">Email id: </h5>
                                    <p className="printDetails">{this.state.studentResponse === undefined ? "" :
                                        this.state.studentResponse.emailId}</p>
                                </div>
                                <div>
                                    <h5 className="printDetails">Labs Registered: </h5>
                                    <p className="printDetails">{this.state.studentResponse === undefined ? "" :
                                        labsToShow}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FacultyHome