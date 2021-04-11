package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.service.StudentOperationService;
import com.example.virtuallab.service.StudentOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class StudentOperationController {

    @Autowired
    private StudentOperationService studentOperationService;
    @Autowired
    private StudentOperationServiceUtil studentOperationServiceUtil;

    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentOperationService.save(student), HttpStatus.OK);
    }

    @GetMapping("/findAllStudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        return new ResponseEntity<>(studentOperationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getStudent/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentOperationService.findById(id);
        return student.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
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
        message = "Successfully registered the studentId" +
                jsonNode.get("studentId") + " for the lab " + jsonNode.get("labName");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
