package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.service.FacultyOperationService;
import com.example.virtuallab.service.LabOperationService;
import com.example.virtuallab.service.impl.FacultyOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String addFaculty(@RequestBody Faculty faculty) {
        facultyOperationService.save(faculty);
        return "Faculty with id: " + faculty.getId() + " added successfully";
    }

    @GetMapping("/findAllFaculties")
    public List<Faculty> getAllFaculty() {
        return facultyOperationService.findAll();
    }

    @GetMapping("/getFaculty/{id}")
    public Optional<Faculty> getFacultyById(@PathVariable int id) {
        return facultyOperationService.findById(id);
    }

    @DeleteMapping("/deleteFaculty/{id}")
    public String deleteFacultyId(@PathVariable int id) {
        facultyOperationService.deleteById(id);
        return "Faculty with id: " + id + " removed successfully";
    }

    @PostMapping("/addLab")
    public String addLab(@RequestBody JsonNode jsonNode) {
        util.saveLab(jsonNode);
        return "Lab with id: " + jsonNode.get("id").asText() + " added successfully";
    }

    @GetMapping("/findAllLabs")
    public List<Lab> getAllLabs() {
        return labOperationService.findAll();
    }

    @GetMapping("/getLab/{id}")
    public Optional<Lab> getLabById(@PathVariable int id) {
        return labOperationService.findById(id);
    }

    @DeleteMapping("/deleteLab/{id}")
    public String deleteLabId(@PathVariable int id) {
        labOperationService.deleteById(id);
        return "Lab with id: " + id + " removed successfully";
    }
}
