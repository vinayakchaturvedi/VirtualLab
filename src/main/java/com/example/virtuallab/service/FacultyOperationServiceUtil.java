package com.example.virtuallab.service;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.utils.Constants;
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
        Faculty faculty = facultyOperationService.findById(jsonNode.get("facultyId").asInt()).orElseGet(null);
        if (faculty == null) return null;
        String labName = jsonNode.get("labName").asText();
        if (!Constants.VALID_LABS.contains(labName)) return null;

        Lab lab = new Lab(jsonNode.get("labName").asText(),
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
        new ExecuteLinuxProcess().executeProcess(processBuilder);
    }

    private void createAndPushDockerImageToDockerHub(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String dockerFilePath = System.getProperty("user.dir") + "/src/main/resources/dockerfiles/" + labName;
        processBuilder.command("docker", "build", dockerFilePath, "-t", "vinayak96/" + labName);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
    }


}
