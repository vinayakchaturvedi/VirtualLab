package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.dao.CommandExecutionDAO;
import com.example.virtuallab.dao.FacultyOperationDAO;
import com.example.virtuallab.service.FacultyOperationServiceUtil;
import com.example.virtuallab.dao.LabOperationDAO;
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
    private FacultyOperationDAO facultyOperationDAO;
    @Autowired
    private LabOperationDAO labOperationDAO;
    @Autowired
    private FacultyOperationServiceUtil util;
    @Autowired
    private CommandExecutionDAO commandExecutionDAO;

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
        Faculty response = facultyOperationDAO.save(faculty);
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
        Iterable<Faculty> all = facultyOperationDAO.findAll();
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
        Iterable<Faculty> all = facultyOperationDAO.findAll();
        List<Faculty> facultyList = new ArrayList<>();
        all.forEach(faculty -> {
            facultyList.add(faculty.shallowCopy(true));
        });
        return new ResponseEntity<>(facultyList, HttpStatus.OK);
    }

    @GetMapping("/getFaculty/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable int id) {
        Optional<Faculty> faculty = facultyOperationDAO.findById(id);
        return faculty.map(value -> new ResponseEntity<>(value.shallowCopy(true), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteFaculty/{id}")
    public ResponseEntity<String> deleteFacultyId(@PathVariable int id) {
        facultyOperationDAO.deleteById(id);
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
        Iterable<Lab> all = labOperationDAO.findAll();
        List<Lab> labList = new ArrayList<>();
        all.forEach(lab -> {
            labList.add(lab.shallowCopy(true));
        });
        return new ResponseEntity<>(labList, HttpStatus.OK);
    }

    @GetMapping("/findAllNonExistingLabs")
    public ResponseEntity<List<String>> getAllNonExistingLabs() {
        Iterable<Lab> all = labOperationDAO.findAll();
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
        Optional<Lab> lab = labOperationDAO.findById(id);
        return lab.map(value -> new ResponseEntity<>(value.shallowCopy(true), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/deleteLab/{id}")
    public ResponseEntity<String> deleteLabId(@PathVariable int id) {
        labOperationDAO.deleteById(id);
        String message = "Lab with id: " + id + " removed successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/getLabByLabName/{labName}")
    public ResponseEntity<Lab> getLabByLabName(@PathVariable String labName) {
        Iterable<Lab> all = labOperationDAO.findAll();
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
        List<Execution> all = commandExecutionDAO.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}
