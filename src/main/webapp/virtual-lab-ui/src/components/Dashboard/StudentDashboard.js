import React, {useState} from "react";

import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Table from "../Table/Table.js";
import Store from "@material-ui/icons/Store";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer.js";
import CustomTabs from "../CustomTabs/CustomTabs.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Sidebar from "../Sidebar/Sidebar.js";
import "../../assets/css/material-dashboard-react.css?v=1.9.0";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "../CustomButtons/Button";
import routes from "../../routes";
import logo from "../../assets/img/reactlogo.png";
import bgImage from "../../assets/img/iiitb-sidebar2.jpg";
import CardBody from "../Card/CardBody";
import plus_sign from "../../plus_sign.png";
import PopUp from "./PopUp";
import ErrorPage from "./ErrorPage";


let ps;

const useStyles = makeStyles(styles);

export default function StudentDashboard({...rest}) {

    if (rest.history.location.state === undefined) {
        return <div>
            <ErrorPage/>
        </div>;
    }
    const classes = useStyles();
    const [size, setSize] = useState('');
    const [numberOfLabs, setNumberOfLabs] = useState(rest.history.location.state.student.labs.length);

    const [c_langLabDesc, setc_langLabDesc] = useState(undefined);
    const [javaLabDesc, setJavaLabDesc] = useState(undefined);
    const [pythonLabDesc, setPythonLabDesc] = useState(undefined);
    const [student, setStudent] = useState(rest.history.location.state.student)
    const [allLabs, setAllLabs] = useState({});
    const [registrationMessage, setRegistrationMessage] = useState("")
    const [executionSummary, setExecutionSummary] = useState([])
    const [completedExercise, setCompletedExercise] = useState({"java": [], "python": [], "c_lang": []})
    const [pendingExercise, setPendingExercise] = useState({"java": [], "python": [], "c_lang": []})
    const [seen, setSeen] = useState(false)
    const [errorCause, setErrorCause] = useState("")

    const [registeredLab, setRegisteredLab] = useState(() => {
        const tempRegisteredLab = {}
        student.labs.forEach(lab => {
            tempRegisteredLab[lab.labName] = lab
        })
        return tempRegisteredLab;
    });

    useState(() => {

        fetch(
            'http://localhost:8700/getPendingExercise/' + student.userName, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let javaList = [], pythonList = [], c_langList = []
                let jIndex = 1, pIndex = 1, cIndex = 1;
                response.forEach(exercise => {
                    let currExerciseRow = []
                    if (exercise.lab.labName === "java") {
                        currExerciseRow.push(jIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/SubmitExercise',
                                    student: student,
                                    exercise: exercise,
                                    labName: "java"
                                })
                            }}
                        >Answer</Button>)
                        javaList.push(currExerciseRow)
                    }
                    if (exercise.lab.labName === "python") {
                        currExerciseRow.push(pIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/SubmitExercise',
                                    student: student,
                                    exercise: exercise,
                                    labName: "python"
                                })
                            }}
                        >Answer</Button>)
                        pythonList.push(currExerciseRow)
                    }
                    if (exercise.lab.labName === "c_lang") {
                        currExerciseRow.push(cIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/SubmitExercise',
                                    student: student,
                                    exercise: exercise,
                                    labName: "c_lang"
                                })
                            }}
                        >Answer</Button>)
                        c_langList.push(currExerciseRow)
                    }
                })
                let exercisePending = {}
                exercisePending["java"] = javaList;
                exercisePending["python"] = pythonList;
                exercisePending["c_lang"] = c_langList;
                setPendingExercise(exercisePending);
            })
            .catch(error => console.log(error));

        fetch(
            'http://localhost:8700/getCompletedExercise/' + student.userName, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let javaList = [], pythonList = [], c_langList = []
                let jIndex = 1, pIndex = 1, cIndex = 1;
                response.forEach(exercise => {
                    let currExerciseRow = []
                    if (exercise.lab.labName === "java") {
                        currExerciseRow.push(jIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/CheckSubmission',
                                    student: student,
                                    exercise: exercise,
                                    labName: "java"
                                })
                            }}
                        >Check</Button>)
                        javaList.push(currExerciseRow)
                    }
                    if (exercise.lab.labName === "python") {
                        currExerciseRow.push(pIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/CheckSubmission',
                                    student: student,
                                    exercise: exercise,
                                    labName: "python"
                                })
                            }}
                        >Check</Button>)
                        pythonList.push(currExerciseRow)
                    }
                    if (exercise.lab.labName === "c_lang") {
                        currExerciseRow.push(cIndex++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(<Button
                            color="info"
                            target="_blank"
                            round
                            onClick={() => {
                                rest.history.push({
                                    pathname: '/CheckSubmission',
                                    student: student,
                                    exercise: exercise,
                                    labName: "c_lang"
                                })
                            }}
                        >Check</Button>)
                        c_langList.push(currExerciseRow)
                    }
                })
                let exerciseSubmitted = {}
                exerciseSubmitted["java"] = javaList;
                exerciseSubmitted["python"] = pythonList;
                exerciseSubmitted["c_lang"] = c_langList;
                setCompletedExercise(exerciseSubmitted);
            })
            .catch(error => console.log(error));


        fetch(
            'http://localhost:8700/getSize/' + student.userName, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.text())
            .then(response => {
                setSize(response)
            })
            .catch(error => console.log(error));

        fetch(
            'http://localhost:8700/getExecution/' + student.userName, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let executionSummary = []
                response.forEach(execution => {
                    let currExecutionRow = []
                    currExecutionRow.push(execution.labName)
                    currExecutionRow.push(execution.command)
                    currExecutionRow.push(execution.successfulExecution ? "Successful" : "Failed")
                    if (execution.successfulExecution) {
                        currExecutionRow.push(<div>-</div>)
                    } else {
                        currExecutionRow.push(
                            <div>
                                <img
                                    className={classes.plusImg}
                                    src={plus_sign}
                                    onClick={() => {
                                        setErrorCause(execution.result)
                                        togglePop()
                                    }}
                                />
                            </div>
                        )
                    }
                    executionSummary.push(currExecutionRow)
                })
                setExecutionSummary(executionSummary)
            })
            .catch(error => console.log(error));

        fetch(
            'http://localhost:8700/getStudentById/' + student.studentId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setStudent(response)
                const tempRegisteredLab = {}
                response.labs.forEach(lab => {
                    tempRegisteredLab[lab.labName] = lab
                })
                setRegisteredLab(tempRegisteredLab)
                setNumberOfLabs(response.labs.length)
            })
            .catch(error => console.log(error));

        fetch(
            'http://localhost:8700/findAllLabs', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let currObj = {};
                response.forEach(lab => {
                    currObj[lab.labName] = lab;
                })
                setAllLabs(currObj)
            })
            .catch(error => console.log(error));

        fetch(
            'http://localhost:8700/getLabByLabName/java/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setJavaLabDesc(response)
            })
            .catch(error => console.log(error));
        fetch(
            'http://localhost:8700/getLabByLabName/python/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setPythonLabDesc(response)
            })
            .catch(error => console.log(error));
        fetch(
            'http://localhost:8700/getLabByLabName/c_lang/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setc_langLabDesc(response)
            })
            .catch(error => console.log(error));
    });

    const mainPanel = React.createRef();
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
        return window.location.pathname !== "/admin/maps";
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);

    let togglePop = () => {
        setSeen(!seen)
    };

    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Virtual Lab"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <h2 style={{margin: "1%"}}>Welcome back! <span
                    style={{color: "#302c8c"}}>{student.studentName}</span>
                </h2>
                <div className={classes.map}>
                    <div style={{marginTop: "3%"}}>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="warning" stats icon>
                                        <CardIcon color="warning">
                                            <Icon>content_copy</Icon>
                                        </CardIcon>
                                        <p className={classes.cardCategory}>Used Space</p>
                                        <h3 className={classes.cardTitle}>
                                            {size}
                                        </h3>
                                    </CardHeader>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="success" stats icon>
                                        <CardIcon color="success">
                                            <Store/>
                                        </CardIcon>
                                        <p className={classes.cardCategory}>Registered Labs</p>
                                        <h3 className={classes.cardTitle}>{numberOfLabs}</h3>
                                    </CardHeader>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomTabs
                                    title="Labs :"
                                    headerColor="primary"
                                    tabs={[
                                        {
                                            tabName: "C Language",
                                            display: c_langLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: registeredLab.c_lang === undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                rest.history.push({
                                                                    pathname: '/StudentTerminal',
                                                                    student: student,
                                                                    lab: registeredLab.c_lang
                                                                })
                                                            }}
                                                        >Use Lab</Button>
                                                    </div>
                                                    <div
                                                        style={{display: registeredLab.c_lang !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/labRegistration/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            studentId: student.studentId,
                                                                            labId: allLabs["c_lang"].labId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.text())
                                                                    .then(response => {
                                                                        setRegistrationMessage(response)
                                                                        console.log("RegistrationMessage: ", registrationMessage)
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Register</Button>
                                                        <h4>{registrationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: c_langLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{c_langLabDesc === undefined ? "" : c_langLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div
                                                        style={{display: c_langLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{c_langLabDesc === undefined ? "" : c_langLabDesc.creationDate}</p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Java",
                                            display: javaLabDesc !== undefined,
                                            tabIcon: Code,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: registeredLab.java === undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                rest.history.push({
                                                                    pathname: '/StudentTerminal',
                                                                    student: student,
                                                                    lab: registeredLab.java
                                                                })
                                                            }}
                                                        >Use Lab</Button>
                                                    </div>
                                                    <div
                                                        style={{display: registeredLab.java !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/labRegistration/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            studentId: student.studentId,
                                                                            labId: allLabs["java"].labId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.text())
                                                                    .then(response => {
                                                                        setRegistrationMessage(response)
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Register</Button>
                                                        <h4>{registrationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: javaLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{javaLabDesc === undefined ? "" : javaLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div
                                                        style={{display: javaLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{javaLabDesc === undefined ? "" : javaLabDesc.creationDate}</p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Python",
                                            display: pythonLabDesc !== undefined,
                                            tabIcon: Cloud,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: registeredLab.python === undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                rest.history.push({
                                                                    pathname: '/StudentTerminal',
                                                                    student: student,
                                                                    lab: registeredLab.python
                                                                })
                                                            }}
                                                        >Use Lab</Button>
                                                    </div>
                                                    <div
                                                        style={{display: registeredLab.python !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/labRegistration/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            studentId: student.studentId,
                                                                            labId: allLabs["python"].labId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.text())
                                                                    .then(response => {
                                                                        setRegistrationMessage(response)
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Register</Button>
                                                        <h4>{registrationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: pythonLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{pythonLabDesc === undefined ? "" : pythonLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div
                                                        style={{display: pythonLabDesc === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{pythonLabDesc === undefined ? "" : pythonLabDesc.creationDate}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomTabs
                                    title="Completed Exercise | Labs :"
                                    headerColor="primary"
                                    tabs={[
                                        {
                                            tabName: "C Language",
                                            display: c_langLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: completedExercise.c_lang.length === 0 && c_langLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No submissions yet</h4></div>
                                                    <div
                                                        style={{display: completedExercise.c_lang.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Check submission"]}
                                                            tableData={completedExercise.c_lang}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Java",
                                            display: javaLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: completedExercise.java.length === 0 && javaLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No submissions yet</h4></div>
                                                    <div
                                                        style={{display: completedExercise.java.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Check submission"]}
                                                            tableData={completedExercise.java}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Python",
                                            display: pythonLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: completedExercise.python.length === 0 && pythonLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No submissions yet</h4></div>
                                                    <div
                                                        style={{display: completedExercise.python.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Check submission"]}
                                                            tableData={completedExercise.python}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomTabs
                                    title="Pending Exercise | Labs :"
                                    headerColor="primary"
                                    tabs={[
                                        {
                                            tabName: "C Language",
                                            display: c_langLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: pendingExercise.c_lang.length === 0 && c_langLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No pending Exercise</h4></div>
                                                    <div
                                                        style={{display: pendingExercise.c_lang.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Submit Now"]}
                                                            tableData={pendingExercise.c_lang}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Java",
                                            display: javaLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: pendingExercise.java.length === 0 && javaLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No pending Exercise</h4></div>
                                                    <div
                                                        style={{display: pendingExercise.java.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Submit Now"]}
                                                            tableData={pendingExercise.java}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Python",
                                            display: pythonLabDesc !== undefined,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: pendingExercise.python.length === 0 && pythonLabDesc !== undefined ? "block" : "none"}}>
                                                        <h4>No pending Exercise</h4></div>
                                                    <div
                                                        style={{display: pendingExercise.python.length === 0 ? "none" : "block"}}>
                                                        <Table
                                                            tableHeaderColor="warning"
                                                            tableHead={["S.No", "Question", "Submit Now"]}
                                                            tableData={pendingExercise.python}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="warning">
                                        <h4 className={classes.cardTitleWhite}>Previous Executions</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="warning"
                                            tableHead={["Lab Name", "Command", "Execution Result", "Error (If any)"]}
                                            tableData={executionSummary}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        {seen ? <PopUp toggle={togglePop} message={errorCause}/> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
