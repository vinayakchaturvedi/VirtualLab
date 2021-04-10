package com.example.virtuallab.service.impl;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.service.FacultyOperationService;
import com.example.virtuallab.service.LabOperationService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;

@Component
public class FacultyOperationServiceUtil {


    @Autowired
    private FacultyOperationService facultyOperationService;
    @Autowired
    private LabOperationService labOperationService;

    public Lab saveLab(JsonNode jsonNode) {
        Faculty faculty = facultyOperationService.findById(jsonNode.get("facultyId").asInt()).get();
        String labName = jsonNode.get("labName").asText();
        Lab lab = new Lab(jsonNode.get("id").asInt(),
                jsonNode.get("labName").asText(),
                jsonNode.get("studentsRegistered").asInt(),
                faculty, new ArrayList<>());
        labOperationService.save(lab);
        createAndPushDockerImageToDockerHub(labName);
        executeAnsiblePlaybookToCreateContainerOnInstitutionServer(labName);
        return lab;
    }

    private void executeAnsiblePlaybookToCreateContainerOnInstitutionServer(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/virtual-lab-playbook.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName, "-i", inventoryPath);
        executeProcess(processBuilder);
    }

    private void createAndPushDockerImageToDockerHub(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String dockerFilePath = System.getProperty("user.dir") + "/src/main/resources/dockerfiles/" + labName;
        processBuilder.command("docker", "build", dockerFilePath, "-t", "vinayak96/" + labName);
        executeProcess(processBuilder);
    }

    private void executeProcess(ProcessBuilder processBuilder) {
        try {
            Process process = processBuilder.start();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
