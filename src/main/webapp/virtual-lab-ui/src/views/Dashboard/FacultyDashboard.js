import React, {useState} from "react";
import {Chart} from "react-chartjs-2";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// core components
import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
// import { cpp, java, python } from "variables/general.js";
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "../../components/CustomButtons/Button";
import routes from "../../routes";
import logo from "../../assets/img/reactlogo.png";
import bgImage from "../../assets/img/iiitb-sidebar2.jpg";
import Table from "../../components/Table/Table";

let ps;

const useStyles = makeStyles(styles);

export default function FacultyDashboard({...rest}) {

    console.log("rest: ", rest);
    const classes = useStyles();
    const [size, setSize] = useState('');
    const [numberOfLabs, setNumberOfLabs] = useState('');

    const [c_langLabDesc, setCLangLabDesc] = useState(undefined);
    const [javaLabDesc, setJavaLabDesc] = useState(undefined);
    const [pythonLabDesc, setPythonLabDesc] = useState(undefined);
    const [faculty, setFaculty] = useState(rest.history.location.state.faculty)
    const [alreadyCreatedLabs, setAlreadyCreatedLabs] = useState({});
    const [nonCreatedLabs, setNotCreatedLabs] = useState({});
    const [creationMessage, setCreationMessage] = useState("")
    const [executionSummary, setExecutionSummary] = useState({})
    const [labels, setLabels] = useState(["Java", "Python"]);
    const [exercises, setExercises] = useState({"java": undefined, "python": undefined, "c_lang": undefined});
    const [exerciseSummary, setExerciseSummary] = useState({"java": [], "python": [], "c_lang": []})

    useState(() => {

        fetch(
            'http://localhost:8700/getAllExerciseByLabName/java', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let currExercises = exercises;
                currExercises["java"] = response.length === 0 ? undefined : response
                if (response.length !== 0) {
                    let index = 1;
                    let currentExerciseSummary = []
                    response.forEach(exercise => {
                        let currExerciseRow = []
                        currExerciseRow.push(index++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(exercise.studentsCompleted.length)
                        currExerciseRow.push(exercise.studentsPending.length)
                        currentExerciseSummary.push(currExerciseRow)
                    })
                    let exerciseSummaryTemp = exerciseSummary
                    exerciseSummaryTemp["java"] = currentExerciseSummary;
                    setExerciseSummary(exerciseSummaryTemp)
                }
                setExercises(currExercises)
                console.log(exercises)
            })
            .catch(error => console.log("Getting Error: ", error));

        fetch(
            'http://localhost:8700/getAllExerciseByLabName/python', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let currExercises = exercises;
                currExercises["python"] = response.length === 0 ? undefined : response
                if (response.length !== 0) {
                    let currentExerciseSummary = []
                    let index = 1;
                    response.forEach(exercise => {
                        let currExerciseRow = []
                        currExerciseRow.push(index++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(exercise.studentsCompleted.length)
                        currExerciseRow.push(exercise.studentsPending.length)
                        currentExerciseSummary.push(currExerciseRow)
                    })
                    let exerciseSummaryTemp = exerciseSummary
                    exerciseSummaryTemp["python"] = currentExerciseSummary;
                    setExerciseSummary(exerciseSummaryTemp)
                }
                setExercises(currExercises)
                console.log(exercises)
            })
            .catch(error => console.log("Getting Error: ", error));

        fetch(
            'http://localhost:8700/getAllExerciseByLabName/c_lang', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let currExercises = exercises;
                currExercises["c_lang"] = response.length === 0 ? undefined : response
                if (response.length !== 0) {
                    let currentExerciseSummary = []
                    let index = 1;
                    response.forEach(exercise => {
                        let currExerciseRow = []
                        currExerciseRow.push(index++)
                        currExerciseRow.push(exercise.question)
                        currExerciseRow.push(exercise.studentsCompleted.length)
                        currExerciseRow.push(exercise.studentsPending.length)
                        currentExerciseSummary.push(currExerciseRow)
                    })
                    let exerciseSummaryTemp = exerciseSummary
                    exerciseSummaryTemp["c_lang"] = currentExerciseSummary;
                    setExerciseSummary(exerciseSummaryTemp)
                }
                setExercises(currExercises)
                console.log(exercises)
            })
            .catch(error => console.log("Getting Error: ", error));

        fetch(
            'http://localhost:8700/getTotalSize/', {
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
            'http://localhost:8700/getExecutionSummary/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                let javaSCount = 0, pythonSCount = 0, cLangSCount = 0;
                let javaFCount = 0, pythonFCount = 0, cLangFCount = 0
                response.forEach(execution => {
                    if (execution.labName === "java") {
                        if (execution.successfulExecution) javaSCount++;
                        else javaFCount++;
                    } else if (execution.labName === "python") {
                        if (execution.successfulExecution) pythonSCount++;
                        else pythonFCount++;
                    }
                    if (execution.labName === "c_lang") {
                        if (execution.successfulExecution) cLangSCount++;
                        else cLangFCount++;
                    }
                })
                let executionSummaryTemp = {};
                executionSummaryTemp["java"] = {
                    SCount: javaSCount,
                    FCount: javaFCount
                }
                executionSummaryTemp["python"] = {
                    SCount: pythonSCount,
                    FCount: pythonFCount
                }
                executionSummaryTemp["c_lang"] = {
                    SCount: cLangSCount,
                    FCount: cLangFCount
                }
                setExecutionSummary(executionSummaryTemp)
            })
            .catch(error => console.log(error));


        fetch(
            'http://localhost:8700/getFacultyById/' + faculty.facultyId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setFaculty(response)
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
                let labelsTemp = [];
                response.forEach(lab => {
                    currObj[lab.labName] = lab;
                })
                setAlreadyCreatedLabs(currObj)
                setNumberOfLabs(response.length)
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
                setCLangLabDesc(response)
            })
            .catch(error => console.log(error));
    });

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    // const handleImageClick = image => {
    //   setImage(image);
    // };
    // const handleColorClick = color => {
    //   setColor(color);
    // };
    // const handleFixedClick = () => {
    //   if (fixedClasses === "dropdown") {
    //     setFixedClasses("dropdown show");
    //   } else {
    //     setFixedClasses("dropdown");
    //   }
    // };
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

    if (document.getElementById("lab_student_count") !== null) {
        let ctx = document.getElementById("lab_student_count").getContext('2d');
        let chartColors = ["#0de368", "#45d1e3", "#5d4848"];
        let currStockActivityChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Java", "Python", "C Language"],
                datasets: [
                    {
                        label: "Quantity",
                        data: [javaLabDesc === undefined ? 0 : javaLabDesc.studentsRegistered,
                            pythonLabDesc === undefined ? 0 : pythonLabDesc.studentsRegistered,
                            c_langLabDesc === undefined ? 0 : c_langLabDesc.studentsRegistered],
                        backgroundColor: chartColors,
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(71,37,37)',
                        fontSize: 15
                    }
                },
                title: {
                    display: true,
                    fontColor: 'rgb(71,37,37)',
                    fontSize: 26,
                    text: "Lab-Student: BreakUp",
                },

            }
        });
    }

    if (document.getElementById("execution_summary") !== null) {
        let ctx = document.getElementById("execution_summary").getContext('2d');
        let currTopStocksOwnedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Successful Execution",
                        data: [executionSummary.java === undefined ? 0 : executionSummary.java.SCount,
                            executionSummary.python === undefined ? 0 : executionSummary.python.SCount,
                            executionSummary.c_lang === undefined ? 0 : executionSummary.c_lang.SCount],
                        backgroundColor: 'rgb(77,240,126)',
                        barThickness: 80
                    },
                    {
                        label: "Failed Execution",
                        data: [executionSummary.java === undefined ? 0 : executionSummary.java.FCount,
                            executionSummary.python === undefined ? 0 : executionSummary.python.FCount,
                            executionSummary.c_lang === undefined ? 0 : executionSummary.c_lang.FCount],
                        backgroundColor: 'rgb(226,23,44)',
                        barThickness: 80
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(71,37,37)',
                        fontSize: 15
                    }
                },
                title: {
                    display: true,
                    fontColor: 'rgb(71,37,37)',
                    fontSize: 26,
                    text: "Execution Summary",
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgb(71,37,37)',
                            fontSize: 16,
                            beginAtZero: true
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgb(71,37,37)',
                            fontSize: 16,
                        },
                    }]
                }

            }
        });
    }

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
                <h2 style={{margin: "1%"}}>Welcome back! <span style={{color: "#302c8c"}}>{faculty.facultyName}</span>
                </h2>
                <div>
                    <div style={{width: "50%", height: "50%", display: "inline-block"}}>
                        <canvas
                            id={"lab_student_count"}
                        />
                    </div>
                    <div style={{width: "50%", height: "50%", display: "inline-block"}}>
                        <canvas
                            id={"execution_summary"}
                        />
                    </div>
                </div>
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
                                        <p className={classes.cardCategory}>Created Labs</p>
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
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.c_lang !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/addLab/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            labName: "c_lang",
                                                                            studentsRegistered: 0,
                                                                            facultyId: faculty.facultyId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.json())
                                                                    .then(response => {
                                                                        console.log("Lab creation response:", response)
                                                                        setCLangLabDesc(response)
                                                                        setCreationMessage("Successfully created the lab")
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Create Lab</Button>
                                                        <h4>{creationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.c_lang === undefined ? "none" : "block"}}>
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
                                                        style={{display: alreadyCreatedLabs.c_lang === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{c_langLabDesc === undefined ? "" : c_langLabDesc.creationDate}</p>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.c_lang === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Total Registered Students: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{c_langLabDesc === undefined ? "" : c_langLabDesc.studentsRegistered}</p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Java",
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.java !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/addLab/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            labName: "java",
                                                                            studentsRegistered: 0,
                                                                            facultyId: faculty.facultyId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.json())
                                                                    .then(response => {
                                                                        console.log("Lab creation response:", response)
                                                                        setJavaLabDesc(response)
                                                                        setCreationMessage("Successfully created the lab")
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Create Lab</Button>
                                                        <h4>{creationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.java === undefined ? "none" : "block"}}>
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
                                                        style={{display: alreadyCreatedLabs.java === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{javaLabDesc === undefined ? "" : javaLabDesc.creationDate}</p>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.java === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Total Registered Students: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{javaLabDesc === undefined ? "" : javaLabDesc.studentsRegistered}</p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Python",
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.python !== undefined ? "none" : "block"}}>
                                                        <Button
                                                            color="info"
                                                            target="_blank"
                                                            round
                                                            onClick={() => {
                                                                fetch(
                                                                    'http://localhost:8700/addLab/', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json;charset=utf-8',
                                                                            'Accept': '*/*'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            labName: "python",
                                                                            studentsRegistered: 0,
                                                                            facultyId: faculty.facultyId
                                                                        })
                                                                    }
                                                                )
                                                                    .then(res => res.json())
                                                                    .then(response => {
                                                                        console.log("Lab creation response:", response)
                                                                        setPythonLabDesc(response)
                                                                        setCreationMessage("Successfully created the lab")
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Create Lab</Button>
                                                        <h4>{creationMessage}</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.python === undefined ? "none" : "block"}}>
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
                                                        style={{display: alreadyCreatedLabs.python === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{pythonLabDesc === undefined ? "" : pythonLabDesc.creationDate}</p>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.python === undefined ? "none" : "block"}}>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Total Registered Students: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{pythonLabDesc === undefined ? "" : pythonLabDesc.studentsRegistered}</p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomTabs
                                    title="Labs :"
                                    headerColor="primary"
                                    tabs={[
                                        {
                                            tabName: "C Language",
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.c_lang !== undefined ? "none" : "block"}}>
                                                        <h4>Lab Doesn't Exist</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.c_lang === undefined ? "none" : "block"}}>
                                                        <div
                                                            style={{display: exerciseSummary.c_lang.length === 0 ? "block" : "none"}}>
                                                            <Button
                                                                color="info"
                                                                target="_blank"
                                                                round
                                                                onClick={() => {
                                                                    console.log("alreadyCreatedLabs: ", alreadyCreatedLabs.c_lang)
                                                                    rest.history.push({
                                                                        pathname: '/CreateExercise',
                                                                        state: {
                                                                            faculty: faculty,
                                                                            lab: alreadyCreatedLabs.c_lang
                                                                        },
                                                                    })
                                                                }}>Create Exercise</Button>
                                                        </div>
                                                        <div
                                                            style={{display: exerciseSummary.c_lang.length === 0 ? "none" : "block"}}>
                                                            <Table
                                                                tableHeaderColor="warning"
                                                                tableHead={["S.No", "Question", "Successful Submission", "Pending Submission"]}
                                                                tableData={exerciseSummary.c_lang}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Java",
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.java !== undefined ? "none" : "block"}}>
                                                        <h4>Lab Doesn't Exist</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.java === undefined ? "none" : "block"}}>
                                                        <div
                                                            style={{display: exerciseSummary.java.length === 0 ? "block" : "none"}}>
                                                            <Button
                                                                color="info"
                                                                target="_blank"
                                                                round
                                                                onClick={() => {
                                                                    console.log("alreadyCreatedLabs: ", alreadyCreatedLabs.java)
                                                                    rest.history.push({
                                                                        pathname: '/CreateExercise',
                                                                        state: {
                                                                            faculty: faculty,
                                                                            lab: alreadyCreatedLabs.java
                                                                        },
                                                                    })
                                                                }}>Create Exercise</Button>
                                                        </div>
                                                        <div
                                                            style={{display: exerciseSummary.java.length === 0 ? "none" : "block"}}>
                                                            <Table
                                                                tableHeaderColor="warning"
                                                                tableHead={["S.No", "Question", "Successful Submission", "Pending Submission"]}
                                                                tableData={exerciseSummary.java}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            tabName: "Python",
                                            display: true,
                                            tabIcon: BugReport,
                                            tabContent: (
                                                <div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.python !== undefined ? "none" : "block"}}>
                                                        <h4>Lab Doesn't Exist</h4>
                                                    </div>
                                                    <div
                                                        style={{display: alreadyCreatedLabs.python === undefined ? "none" : "block"}}>
                                                        <div
                                                            style={{display: exerciseSummary.python.length === 0 ? "block" : "none"}}>
                                                            <Button
                                                                color="info"
                                                                target="_blank"
                                                                round
                                                                onClick={() => {
                                                                    console.log("alreadyCreatedLabs: ", alreadyCreatedLabs.python)
                                                                    rest.history.push({
                                                                        pathname: '/CreateExercise',
                                                                        state: {
                                                                            faculty: faculty,
                                                                            lab: alreadyCreatedLabs.python
                                                                        },
                                                                    })
                                                                }}>Create Exercise</Button>
                                                        </div>
                                                        <div
                                                            style={{display: exerciseSummary.python.length === 0 ? "none" : "block"}}>
                                                            <Table
                                                                tableHeaderColor="warning"
                                                                tableHead={["S.No", "Question", "Successful Submission", "Pending Submission"]}
                                                                tableData={exerciseSummary.python}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
