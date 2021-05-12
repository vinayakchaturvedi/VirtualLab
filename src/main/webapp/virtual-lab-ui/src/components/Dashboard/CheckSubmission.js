import React, {Component} from "react";

class CheckSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.location.student,
            exercise: this.props.location.exercise,
            labName: this.props.location.labName,
            textBoxContent: "",
            isLoading: true
        }
        console.log("Student received: ", this.props.location.student)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.retrieveSubmission = this.retrieveSubmission.bind(this)
    }

    componentDidMount() {
        if (this.state.student === undefined) {
            this.setState({
                student: JSON.parse(localStorage.getItem('student')),
                exercise: JSON.parse(localStorage.getItem('exercise')),
                labName: JSON.parse(localStorage.getItem('labName')),
            }, () => this.retrieveSubmission())
        } else {
            localStorage.setItem('student', JSON.stringify(this.state.student));
            localStorage.setItem('exercise', JSON.stringify(this.state.exercise));
            localStorage.setItem('labName', JSON.stringify(this.state.labName));
            this.setState({
                student: this.state.student
            }, () => this.retrieveSubmission())
        }
    }

    async retrieveSubmission() {
        let response = await fetch('http://localhost:8700/retrieveSubmission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                studentId: this.state.student.studentId,
                exerciseId: this.state.exercise.exerciseId,
                labName: this.state.labName,
            })
        });

        if (response.status === 200) {
            let result = await response.json();
            console.log("Submitted exercise: ", result)
            this.setState({
                textBoxContent: result.result,
                isLoading: false
            })
        } else {
            console.error("Error while completing exercise... response: ", await response.text())
        }
    }

    async handleChange(event) {
        if (event === undefined) return;

        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    async submit() {
        this.props.history.push({
            pathname: '/dashboard',
            state: {student: this.state.student}
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="StudentTerminal"><h2 style={{color: "white"}}>Loading your submission</h2></div>
            )
        }

        return (
            <div className="StudentTerminal">
                <h2 style={{color: "white"}}>Welcome back! {this.state.student.studentName}</h2>
                <h3 style={{color: "white"}}>Exercise: {this.state.exercise.question}</h3>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80%"
                    }}
                >
                <textarea
                    name="textBoxContent"
                    required="True"
                    placeholder="Write your text here"
                    value={this.state.textBoxContent}
                    disabled="True"
                    onChange={this.handleChange}
                />
                    <button onClick={this.submit} className="CreateLab">Go to Dashboard</button>
                </div>
            </div>
        )
    }

}

export default CheckSubmission