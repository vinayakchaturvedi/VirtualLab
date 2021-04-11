package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Student;
import com.example.virtuallab.service.StudentOperationService;
import com.example.virtuallab.service.StudentOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String addStudent(@RequestBody Student student) {
        studentOperationService.save(student);
        return "Student with id: " + student.getId() + " added successfully";
    }

    @GetMapping("/findAllStudents")
    public List<Student> getAllStudents() {
        return studentOperationService.findAll();
    }

    @GetMapping("/getStudent/{id}")
    public Optional<Student> getStudentById(@PathVariable int id) {
        return studentOperationService.findById(id);
    }

    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudentId(@PathVariable int id) {
        studentOperationService.deleteById(id);
        return "Student with id: " + id + " removed successfully";
    }

    @PostMapping("/labRegistration")
    public String labRegistration(@RequestBody JsonNode jsonNode) {
        studentOperationServiceUtil.labRegistration(jsonNode);
        return "Successfully registered the studentId" +
                jsonNode.get("studentId") + " for the lab " + jsonNode.get("labName");
    }
}
