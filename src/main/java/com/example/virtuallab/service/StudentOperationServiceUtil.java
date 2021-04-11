package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentOperationServiceUtil {

    @Autowired
    private LabOperationService labOperationService;
    @Autowired
    private StudentOperationService studentOperationService;


    public Lab labRegistration(JsonNode jsonNode) {
        int studentId = jsonNode.get("studentId").asInt();
        int labId = jsonNode.get("labId").asInt();

        Student student = studentOperationService.findById(labId).orElseGet(null);
        Lab lab = labOperationService.findById(labId).orElseGet(null);

        if (student == null || lab == null) return null;

        lab.getStudents().add(student);
        labOperationService.save(lab);
        createUserInContainer(lab, student);
        return lab;
    }

    private void createUserInContainer(Lab lab, Student student) {
        executeAnsiblePlaybookToCreateUserOnSpecifiedLabContainer(lab.getLabName(), student.getFirstName());
    }

    private void executeAnsiblePlaybookToCreateUserOnSpecifiedLabContainer(String labName, String studentName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/create-user-in-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName + " studentName=" + studentName, "-i", inventoryPath);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
    }
}
