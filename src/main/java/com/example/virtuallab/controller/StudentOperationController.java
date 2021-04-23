package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.service.StudentOperationService;
import com.example.virtuallab.service.StudentOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class StudentOperationController {

    @Autowired
    private StudentOperationService studentOperationService;
    @Autowired
    private StudentOperationServiceUtil studentOperationServiceUtil;

    /*
    {
    "userName": "MT2020046",
    "studentName": "Vinayak Chaturvedi",
    "emailId": "vinayak.chaturvedi96@gmail.com",
    "password": "root"
    }
     */
    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student response = studentOperationService.save(student);
        return new ResponseEntity<>(response.shallowCopy(true), HttpStatus.OK);
    }

    /*
    {
        "userName": "MT2020046",
        "password": "root"
     }
     */
    @PostMapping("/verifyStudentLogin")
    public ResponseEntity<Student> verifyStudentLogin(@RequestBody Student request) {
        Iterable<Student> all = studentOperationService.findAll();
        final Student[] response = {null};
        all.forEach(student -> {
            if (student.getUserName().equals(request.getUserName()) &&
                    student.getPassword().equals(request.getPassword()))
                response[0] = student.shallowCopy(true);
        });
        if (response[0] == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response[0], HttpStatus.OK);
    }

    @GetMapping("/findAllStudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        Iterable<Student> all = studentOperationService.findAll();
        List<Student> studentList = new ArrayList<>();
        all.forEach(student -> {
            studentList.add(student.shallowCopy(true));
        });
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }

    @GetMapping("/getStudentByUserName/{userName}")
    public ResponseEntity<Student> getStudentByUserName(@PathVariable String userName) {
        Iterable<Student> all = studentOperationService.findAll();
        final Student[] response = {null};
        all.forEach(student -> {
            if (student.getUserName().equals(userName))
                response[0] = student.shallowCopy(true);
        });
        if (response[0] == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response[0], HttpStatus.OK);
    }

    @GetMapping("/getStudentById/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentOperationService.findById(id);
        return student.map(value -> new ResponseEntity<>(value.shallowCopy(true), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<String> deleteStudentId(@PathVariable int id) {
        studentOperationService.deleteById(id);
        String message = "Student with id: " + id + " removed successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /*
    {
        "studentId": 1,
        "labId": 1
    }
     */
    @PostMapping("/labRegistration")
    public ResponseEntity<String> labRegistration(@RequestBody JsonNode jsonNode) {
        Lab response = studentOperationServiceUtil.labRegistration(jsonNode);
        String message = "";
        if (response == null) {
            message = "Error Lab/Student does not exist";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        message = "Successfully registered the studentId " +
                jsonNode.get("studentId") + " for the lab " + response.getLabName();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping(value = "/execCommand", produces = {"application/json"})
    public ResponseEntity<Execution> execCommand(@RequestBody Execution execution) {
        // TODO :: pass home directory of user
        String result = studentOperationServiceUtil.executeCommand("temp", "temp", "cd /home/rushikesh ;" + execution.getCommand());
        execution.setResult(result);
        return new ResponseEntity<>(execution, HttpStatus.OK);
    }
}
