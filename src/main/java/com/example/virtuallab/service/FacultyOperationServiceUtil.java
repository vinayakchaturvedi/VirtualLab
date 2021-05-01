package com.example.virtuallab.service;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.dao.FacultyOperationDAO;
import com.example.virtuallab.dao.LabOperationDAO;
import com.example.virtuallab.utils.Constants;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class FacultyOperationServiceUtil {

    @Autowired
    private FacultyOperationDAO facultyOperationDAO;
    @Autowired
    private LabOperationDAO labOperationDAO;
    private ExecuteLinuxProcess executeLinuxProcess;

    public FacultyOperationServiceUtil() {
        executeLinuxProcess = new ExecuteLinuxProcess();
    }

    public FacultyOperationServiceUtil(ExecuteLinuxProcess executeLinuxProcess) {
        this.executeLinuxProcess = executeLinuxProcess;
    }

    public Lab saveLab(JsonNode jsonNode) {
        if (!facultyOperationDAO.findById(jsonNode.get("facultyId").asInt()).isPresent()) return null;
        Faculty faculty = facultyOperationDAO.findById(jsonNode.get("facultyId").asInt()).orElseGet(null);
        if (faculty == null) return null;
        String labName = jsonNode.get("labName").asText();
        if (!Constants.VALID_LABS.contains(labName)) return null;

        Lab lab = new Lab(jsonNode.get("labName").asText(),
                jsonNode.get("studentsRegistered").asInt(),
                faculty, new ArrayList<>());
        labOperationDAO.save(lab);
        createAndPushDockerImageToDockerHub(labName);
        executeAnsiblePlaybookToCreateContainerOnInstitutionServer(labName);
        return lab;
    }

    public String executeAnsiblePlaybookToCreateContainerOnInstitutionServer(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/virtual-lab-playbook.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String inputParameter = "labName=" + labName;
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", inputParameter, "-i", inventoryPath);
        return this.executeLinuxProcess.executeProcess(processBuilder);
    }

    public String createAndPushDockerImageToDockerHub(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String dockerFilePath = System.getProperty("user.dir") + "/src/main/resources/dockerfiles/" + labName;
        processBuilder.command("docker", "build", dockerFilePath, "-t", "vinayak96/" + labName);
        return this.executeLinuxProcess.executeProcess(processBuilder);


        /**
         * Execute only if there is any change in docker file.
         processBuilder = new ProcessBuilder();
         processBuilder.command("docker", "push", "vinayak96/" + labName + ":latest");
         this.executeLinuxProcess.executeProcess(processBuilder);
         **/
    }


}
