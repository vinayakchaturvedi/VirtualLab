import React, {useEffect, useState} from "react";
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
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
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

let ps;

const useStyles = makeStyles(styles);

export default function Dashboard({...rest}) {

    const classes = useStyles();
    const [size, setSize] = useState('');
    const [numberOfLabs, setNumberOfLabs] = useState(rest.history.location.state.student.labs.length);

    const [cppLabDesc, setCppLabDesc] = useState(undefined);
    const [javaLabDesc, setJavaLabDesc] = useState(undefined);
    const [pythonLabDesc, setPythonLabDesc] = useState(undefined);
    const [student, setStudent] = useState(rest.history.location.state.student)
    const [allLabs, setAllLabs] = useState({});
    const [registrationMessage, setRegistrationMessage] = useState("")

    const [registeredLab, setRegisteredLab] = useState(() => {
        const tempRegisteredLab = {}
        student.labs.forEach(lab => {
            tempRegisteredLab[lab.labName] = lab
        })
        return tempRegisteredLab;
    });

    useState(() => {
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
            'http://localhost:8700/getLabByLabName/cpp/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.json())
            .then(response => {
                setCppLabDesc(response)
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
                <h2 style={{margin: "1%"}}>Welcome back! <span style={{color: "#302c8c"}}>{student.studentName}</span>
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
                                            display: cppLabDesc !== undefined,
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
                                                    <div>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{cppLabDesc === undefined ? "" : cppLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Creation Date: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{cppLabDesc === undefined ? "" : cppLabDesc.creationDate}</p>
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
                                                                        console.log("RegistrationMessage: ", response)
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Register</Button>
                                                        <h4>{registrationMessage}</h4>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{javaLabDesc === undefined ? "" : javaLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div>
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
                                                                        console.log("RegistrationMessage: ", response)
                                                                    })
                                                                    .catch(error => console.log(error));
                                                            }}
                                                        >Register</Button>
                                                        <h4>{registrationMessage}</h4>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "200%",
                                                            color: "#a38282", padding: "2%"
                                                        }}>Conducted By: </p>
                                                        <p style={{
                                                            display: "inline-block", fontSize: "180%",
                                                            padding: "2%"
                                                        }}>{pythonLabDesc === undefined ? "" : pythonLabDesc.faculty.facultyName}</p>
                                                    </div>
                                                    <div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
