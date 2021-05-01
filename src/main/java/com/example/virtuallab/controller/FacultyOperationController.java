package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.service.CommandExecutionService;
import com.example.virtuallab.service.FacultyOperationService;
import com.example.virtuallab.service.FacultyOperationServiceUtil;
import com.example.virtuallab.service.LabOperationService;
import com.example.virtuallab.utils.Constants;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class FacultyOperationController {

    @Autowired
    private FacultyOperationService facultyOperationService;
    @Autowired
    private LabOperationService labOperationService;
    @Autowired
    private FacultyOperationServiceUtil util;
    @Autowired
    private CommandExecutionService commandExecutionService;

    /*
    {
    "userName": "T01",
    "facultyName": "R Thangaraju",
    "emailId": "Thangaraju@gmail.com",
    "password": "root"
    }
     */
    @PostMapping("/addFaculty")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        Faculty response = facultyOperationService.save(faculty);
        return new ResponseEntity<>(response.shallowCopy(true), HttpStatus.OK);
    }

    /*
    {
        "userName": "T01",
        "password": "root"
    }
     */
    @PostMapping("/verifyFacultyLogin")
    public ResponseEntity<Faculty> verifyFacultyLogin(@RequestBody Faculty request) {
        Iterable<Faculty> all = facultyOperationService.findAll();
        final Faculty[] response = {null};
        all.forEach(faculty -> {
            if (faculty.getUserName().equals(request.getUserName()) &&
                    faculty.getPassword().equals(request.getPassword()))
                response[0] = faculty.shallowCopy(true);
        });
        if (response[0] == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response[0], HttpStatus.OK);
    }

    @GetMapping("/findAllFaculties")
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        Iterable<Faculty> all = facultyOperationService.findAll();
        List<Faculty> facultyList = new ArrayList<>();
        all.forEach(faculty -> {
            facultyList.add(faculty.shallowCopy(true));
        });
        return new ResponseEntity<>(facultyList, HttpStatus.OK);
    }

    @GetMapping("/getFaculty/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable int id) {
        Optional<Faculty> faculty = facultyOperationService.findById(id);
        return faculty.map(value -> new ResponseEntity<>(value.shallowCopy(true), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
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
        if (lab == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(lab.shallowCopy(true), HttpStatus.OK);
    }

    @GetMapping("/findAllLabs")
    public ResponseEntity<List<Lab>> getAllLabs() {
        Iterable<Lab> all = labOperationService.findAll();
        List<Lab> labList = new ArrayList<>();
        all.forEach(lab -> {
            labList.add(lab.shallowCopy(true));
        });
        return new ResponseEntity<>(labList, HttpStatus.OK);
    }

    @GetMapping("/findAllNonExistingLabs")
    public ResponseEntity<List<String>> getAllNonExistingLabs() {
        Iterable<Lab> all = labOperationService.findAll();
        Set<String> labList = new HashSet<>();
        all.forEach(lab -> {
            labList.add(lab.getLabName());
        });

        List<String> response = new ArrayList<>();
        for (String lab : Constants.VALID_LABS) {
            if (!labList.contains(lab))
                response.add(lab);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/getLab/{id}")
    public ResponseEntity<Lab> getLabById(@PathVariable int id) {
        Optional<Lab> lab = labOperationService.findById(id);
        return lab.map(value -> new ResponseEntity<>(value.shallowCopy(true), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteLab/{id}")
    public ResponseEntity<String> deleteLabId(@PathVariable int id) {
        labOperationService.deleteById(id);
        String message = "Lab with id: " + id + " removed successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/getLabByLabName/{labName}")
    public ResponseEntity<Lab> getLabByLabName(@PathVariable String labName) {
        Iterable<Lab> all = labOperationService.findAll();
        final Lab[] response = {null};
        all.forEach(lab -> {
            if (lab.getLabName().equals(labName))
                response[0] = lab.shallowCopy(true);
        });
        if (response[0] == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response[0], HttpStatus.OK);
    }

    @GetMapping("/getExecutionSummary")
    public ResponseEntity<List<Execution>> getExecutionSummary() {
        List<Execution> all = commandExecutionService.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
