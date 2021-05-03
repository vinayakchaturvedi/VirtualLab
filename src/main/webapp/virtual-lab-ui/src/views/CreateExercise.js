import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Input} from "@material-ui/core";
import plus_sign from "../plus_sign.png";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
        img: {
            borderRadius: "4px",
            padding: "5px",
            width: "50px",
            alignContent: "center",
        }
    })
;

export default function CreateExercise() {
    const classes = useStyles();

    const [faculty, setFaculty] = useState({
        "facultyId": 2,
        "userName": "T02",
        "facultyName": "Chandrashekar Ramanathan",
        "emailId": "RC@gmail.com",
        "password": "root",
        "labs": [
            {
                "labId": 4,
                "labName": "java",
                "studentsRegistered": 6,
                "creationDate": "2021-04-25",
                "faculty": null,
                "students": null,
                "exercises": []
            }
        ]
    });

    const [exercises, setExercises] = useState([[1, <Input fullWidth/>]]);
    const [exercisesRow, setExercisesRow] = useState([createData(1, <Input fullWidth/>)])

    function createData(sNo, questions) {
        return {sNo, questions};
    }

    function createExerciseRow() {
        console.log(exercises)
        let rowsTemp = [];
        for (let exercisesKey in exercises) {
            rowsTemp.push(createData(exercises[exercisesKey][0], exercises[exercisesKey][1]))
        }
        setExercisesRow(rowsTemp)
    }

    console.log(exercises)


    return (
        <div style={{alignContent: "center"}}>
            <TableContainer style={{width: "70%"}} component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>S. No.</StyledTableCell>
                            <StyledTableCell align="left">Question</StyledTableCell>
                            <StyledTableCell align="right">Add more</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exercisesRow.map((row) => (
                            <StyledTableRow key={row.sNo}>
                                <StyledTableCell component="th" scope="row">
                                    {row.sNo}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="left">
                                    {row.questions}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <img
                                        className={classes.img}
                                        src={plus_sign}
                                        onClick={event => {
                                            let currExercises = exercises;
                                            currExercises.push([currExercises.length + 1, <Input fullWidth/>])
                                            setExercises(currExercises)
                                            createExerciseRow()
                                        }
                                        }
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
