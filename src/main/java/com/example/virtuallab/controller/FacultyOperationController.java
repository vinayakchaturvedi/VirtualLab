package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.service.FacultyOperationService;
import com.example.virtuallab.service.FacultyOperationServiceUtil;
import com.example.virtuallab.service.LabOperationService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FacultyOperationController {

    @Autowired
    private FacultyOperationService facultyOperationService;
    @Autowired
    private LabOperationService labOperationService;
    @Autowired
    private FacultyOperationServiceUtil util;

    @PostMapping("/addFaculty")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        return new ResponseEntity<>(facultyOperationService.save(faculty), HttpStatus.OK);
    }

    @GetMapping("/findAllFaculties")
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        return new ResponseEntity<>(facultyOperationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getFaculty/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable int id) {
        Optional<Faculty> faculty = facultyOperationService.findById(id);
        return faculty.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteFaculty/{id}")
    public ResponseEntity<String> deleteFacultyId(@PathVariable int id) {
        facultyOperationService.deleteById(id);
        String message = "Faculty with id: " + id + " removed successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/addLab")
    public ResponseEntity<Lab> addLab(@RequestBody JsonNode jsonNode) {
        Lab lab = util.saveLab(jsonNode);
        return new ResponseEntity<>(labOperationService.save(lab), HttpStatus.OK);
    }

    @GetMapping("/findAllLabs")
    public ResponseEntity<List<Lab>> getAllLabs() {
        return new ResponseEntity<>(labOperationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getLab/{id}")
    public ResponseEntity<Lab> getLabById(@PathVariable int id) {
        Optional<Lab> lab = labOperationService.findById(id);
        return lab.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteLab/{id}")
    public ResponseEntity<String> deleteLabId(@PathVariable int id) {
        labOperationService.deleteById(id);
        String message = "Lab with id: " + id + " removed successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
