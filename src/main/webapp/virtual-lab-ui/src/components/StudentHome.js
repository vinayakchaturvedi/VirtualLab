import React, {Component} from "react";
import {Link} from "react-router-dom";

class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.location.student,
            isLoading: true,
            availableLabsForRegistration: [],
            availableLabsDetailsForRegistration: undefined,
            selectLabForRegistration: "",
            labRegistrationMessage: "",
            selectLabForUse: "",
            alreadyRegisteredLabs: [],
            alreadyRegisteredLabsDetails: undefined
        }

        this.logout = this.logout.bind(this);
        this.registerLab = this.registerLab.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.useLab = this.useLab.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    async componentDidMount() {
        if (this.state.student === undefined) {
            this.setState({
                student: JSON.parse(localStorage.getItem('student')),
                isLoading: false
            }, () => this.loadData())
        } else {
            localStorage.setItem('student', JSON.stringify(this.state.student));
            this.setState({
                isLoading: false
            }, () => this.loadData())
        }
    }

    async loadData() {
        let alreadyRegisteredLabsTemp = []
        let alreadyRegisteredLabsDetailsTemp = {}
        this.state.student.labs.forEach(lab => {
            alreadyRegisteredLabsTemp.push(lab.labName)
            alreadyRegisteredLabsDetailsTemp[lab.labName] = lab
        })
        alreadyRegisteredLabsTemp.unshift("Select the lab")
        this.setState({
            alreadyRegisteredLabs: alreadyRegisteredLabsTemp,
            alreadyRegisteredLabsDetails: alreadyRegisteredLabsDetailsTemp
        })

        let response2 = await fetch('http://localhost:8700/getNotRegisteredLabs/' +
            this.state.student.studentId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        });

        let status2 = response2.status;
        if (status2 === 200) {
            let availableLabsDetailsForRegistrationTemp = {};
            let availableLabsForRegistrationTemp = []
            let temp = await response2.json()
            temp.forEach(lab => {
                availableLabsDetailsForRegistrationTemp[lab.labName] = lab
                availableLabsForRegistrationTemp.push(lab.labName)
            })
            availableLabsForRegistrationTemp.unshift("Select the lab")
            this.setState({
                availableLabsDetailsForRegistration: availableLabsDetailsForRegistrationTemp,
                availableLabsForRegistration: availableLabsForRegistrationTemp
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

    async registerLab() {

        this.setState({
            labRegistrationMessage: "Please wait! while we are registering you for this lab..."
        })

        let response = await fetch('http://localhost:8700/labRegistration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                studentId: this.state.student.studentId,
                labId: this.state.availableLabsDetailsForRegistration[this.state.selectLabForRegistration].labId
            })
        });

        if (response.status === 200) {
            let result = await response.text()
            this.setState({
                labRegistrationMessage: result
            }, () => this.updateStudent())
        }
    }

    async updateStudent() {
        let response2 = await fetch('http://localhost:8700/getStudentById/' +
            JSON.parse(localStorage.getItem('student')).studentId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        });

        let student = await response2.json();
        localStorage.setItem('student', JSON.stringify(student));
        this.setState({
            student: student
        }, () => this.loadData())
    }

    async useLab() {
        this.props.history.push({
            pathname: "/StudentTerminal",
            student: this.state.student,
            lab: this.state.alreadyRegisteredLabsDetails[this.state.selectLabForUse]
        })
    }

    logout() {
        localStorage.removeItem('student');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }

        const labListForRegistration = this.state.availableLabsForRegistration.map(item =>
            <option value={item}>
                {item}
            </option>
        )

        const labListForUse = this.state.alreadyRegisteredLabs.map(item =>
            <option value={item}>
                {item}
            </option>
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

                <div className="StudentHome">
                    <h5 className="printDetails">Welcome back! {this.state.student.studentName}</h5>
                    <div className="container">
                        <div className="item">
                            <h4>Register for a lab</h4>
                            <div
                                className="labList">
                                <select
                                    name="selectLabForRegistration"
                                    value={this.state.selectLabForRegistration}
                                    onChange={this.handleChange}
                                >
                                    {labListForRegistration}
                                </select>
                            </div>
                            <button onClick={this.registerLab} className="CreateLab">
                                Register
                            </button>
                            <p className="createLabMessage">{this.state.labRegistrationMessage}</p>
                        </div>
                        <div className="item">
                            <h4>Use your lab</h4>
                            <div
                                className="labList">
                                <select
                                    name="selectLabForUse"
                                    value={this.state.selectLabForUse}
                                    onChange={this.handleChange}
                                >
                                    {labListForUse}
                                </select>
                            </div>
                            <button onClick={this.useLab} className="CreateLab">
                                Use
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default StudentHome