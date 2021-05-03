import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('1', "WAP to print Hello world"),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

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

    const [exercises, setExercises] = useState({});

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>S. No.</StyledTableCell>
                        <StyledTableCell align="left">Question</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.calories}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
