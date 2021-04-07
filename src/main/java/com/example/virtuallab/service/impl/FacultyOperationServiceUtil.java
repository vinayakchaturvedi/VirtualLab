package com.example.virtuallab.service.impl;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.service.FacultyOperationService;
import com.example.virtuallab.service.LabOperationService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class FacultyOperationServiceUtil {


    @Autowired
    private FacultyOperationService facultyOperationService;
    @Autowired
    private LabOperationService labOperationService;

    public Lab saveLab(JsonNode jsonNode) {
        Faculty faculty = facultyOperationService.findById(jsonNode.get("facultyId").asInt()).get();
        Lab lab = new Lab(jsonNode.get("id").asInt(),
                jsonNode.get("labName").asText(),
                jsonNode.get("studentsRegistered").asInt(),
                faculty, new ArrayList<>());
        labOperationService.save(lab);
        return lab;
    }
}
