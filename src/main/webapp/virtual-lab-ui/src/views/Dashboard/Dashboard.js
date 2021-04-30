import React, {useEffect, useState} from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
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
import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

// import { cpp, java, python } from "variables/general.js";
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "../../components/CustomButtons/Button";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {

    const [size, setSize] = useState('');
    const [numberOfLabs, setNumberOfLabs] = useState('');

    const [cppLabDesc, setCppLabDesc] = useState(undefined);
    const [javaLabDesc, setJavaLabDesc] = useState(undefined);
    const [pythonLabDesc, setPythonLabDesc] = useState(undefined);
    console.log("Received Student: ", props.location.student)


    useState(() => {
        fetch(
            'http://localhost:8700/getSize/MT2020046/', {
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
            'http://localhost:8700/getNumberOfLabs/MT2020046/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': '*/*'
                },
            }
        )
            .then(res => res.text())
            .then(response => {
                setNumberOfLabs(response)
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

    const classes = useStyles();
    return (
        <div>
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
                {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Labs :"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "C++",
                                tabIcon: BugReport,
                                tabContent: (
                                    <div>
                                        <Button
                                            color="info"
                                            target="_blank"
                                            round
                                        >Use Lab</Button>
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
                                tabIcon: Code,
                                tabContent: (
                                    <div>
                                        <Button
                                            color="info"
                                            target="_blank"
                                            round
                                        >Use Lab</Button>
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
                                tabIcon: Cloud,
                                tabContent: (
                                    <div>
                                        <Button
                                            color="info"
                                            target="_blank"
                                            round
                                        >Use Lab</Button>
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
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                            <p className={classes.cardCategoryWhite}>
                                New employees on 15th September, 2016
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["ID", "Name", "Salary", "Country"]}
                                tableData={[
                                    ["1", "Dakota Rice", "$36,738", "Niger"],
                                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
