package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.service.LabOperationService;
import com.example.virtuallab.service.StudentOperationService;
import com.example.virtuallab.service.StudentOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class StudentOperationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(StudentOperationController.class);
    @Autowired
    private StudentOperationService studentOperationService;
    @Autowired
    private StudentOperationServiceUtil studentOperationServiceUtil;
    @Autowired
    private LabOperationService labOperationService;

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

    @GetMapping("/getNotRegisteredLabs/{id}")
    public ResponseEntity<List<Lab>> getNotRegisteredLabs(@PathVariable int id) {
        Optional<Student> student = studentOperationService.findById(id);
        Set<String> alreadyRegisteredLabs = new HashSet<>();
        student.get().getLabs().forEach(lab -> alreadyRegisteredLabs.add(lab.getLabName()));
        Iterable<Lab> allLabs = labOperationService.findAll();
        List<Lab> notRegisteredLabs = new ArrayList<>();
        allLabs.forEach(lab -> {
            if (!alreadyRegisteredLabs.contains(lab.getLabName())) {
                notRegisteredLabs.add(lab.shallowCopy(false));
            }
        });

        return new ResponseEntity<>(notRegisteredLabs, HttpStatus.OK);
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
        message = "Successfully registered the StudentId " +
                jsonNode.get("studentId") + " for the lab " + response.getLabName();
        LOGGER.info(message);
        return new ResponseEntity<>("Registration Successful", HttpStatus.OK);
    }

    @PostMapping(value = "/execCommand", produces = {"application/json"})
    public ResponseEntity<Execution> execCommand(@RequestBody Execution execution) {
        LOGGER.info("Command Execution request: " + execution);
        execution = studentOperationServiceUtil.executeCommand(execution);
        LOGGER.info("Command Execution response: " + execution);
        return new ResponseEntity<>(execution, HttpStatus.OK);
    }

    @GetMapping("/getSize/{userName}")
    public ResponseEntity<String> getSizeOfDirectories(@PathVariable String userName) {
        Execution execution = new Execution();
        int totalSize = 0;
        String unit = " KB";
        execution.setCommand("du -sh");
        execution.setUserName(userName);
        Iterable<Student> all = studentOperationService.findAll();
        final Student[] response = {null};
        all.forEach(student -> {
            if (student.getUserName().equals(userName))
                response[0] = student.shallowCopy(true);
        });
        for (Lab labs : response[0].getLabs()) {
            execution.setLabName(labs.getLabName());
            execution = studentOperationServiceUtil.executeCommand(execution);
            String size = execution.getResult().split("\t")[0];
            totalSize += Integer.parseInt(size.substring(0, size.length() - 1));
        }
        LOGGER.info("Total size used by " + userName + " is " + totalSize + unit);
        return new ResponseEntity<>(totalSize + unit, HttpStatus.OK);
    }

    @GetMapping("/getNumberOfLabs/{userName}")
    public ResponseEntity<String> getNumberOfLabs(@PathVariable String userName) {
        Iterable<Student> all = studentOperationService.findAll();
        final Student[] response = {null};
        all.forEach(student -> {
            if (student.getUserName().equals(userName))
                response[0] = student.shallowCopy(true);
        });
        return new ResponseEntity<>(String.valueOf(response[0].getLabs().size()), HttpStatus.OK);
    }
}
