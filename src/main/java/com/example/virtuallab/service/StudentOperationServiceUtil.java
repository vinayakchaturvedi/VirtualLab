package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.utils.FileOperation;
import com.example.virtuallab.utils.ListOfValidCommands;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class StudentOperationServiceUtil {

    @Autowired
    private LabOperationService labOperationService;
    @Autowired
    private StudentOperationService studentOperationService;


    public Lab labRegistration(JsonNode jsonNode) {
        int studentId = jsonNode.get("studentId").asInt();
        int labId = jsonNode.get("labId").asInt();

        Student student = studentOperationService.findById(studentId).orElseGet(null);
        Lab lab = labOperationService.findById(labId).orElseGet(null);

        if (student == null || lab == null) return null;

        student.getLabs().add(lab);
        lab.setStudentsRegistered(lab.getStudentsRegistered() + 1);
        studentOperationService.save(student);
        labOperationService.save(lab);
        createUserInContainer(lab, student);
        return lab;
    }

    private void createUserInContainer(Lab lab, Student student) {
        executeAnsiblePlaybookToCreateUserOnSpecifiedLabContainer(lab.getLabName(), student.getUserName());
    }

    private void executeAnsiblePlaybookToCreateUserOnSpecifiedLabContainer(String labName, String userName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/execute-command-in-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String createUserCommand = "'useradd -m -p $(openssl passwd -1 " + userName + ") " + userName + "'";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName + " command=" + createUserCommand, "-i", inventoryPath);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
    }

    public String executeCommand(String labName, String userName, String commandRequest) {
        /*if (!isValid(command)) {
            return "Invalid Permission or Command";
        }*/
        if (commandRequest.split(" ")[0].equals("viWrite")) {
            handleViWrite(labName, userName, commandRequest);
            return "Done";
        } else if (commandRequest.split(" ")[0].equals("viRead")) {
            return handleViRead(labName, userName, commandRequest);
        }

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/execute-command-in-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String command = "bash -c \\\"cd /home/" + userName + " && " + commandRequest + "\\\"";
        command = "'" + command + "'";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName + " command=" + command, "-i", inventoryPath);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
        return new FileOperation().readFile("/home/vinayak/output.txt");
    }

    private String handleViRead(String labName, String userName, String commandRequest) {
        String fileName = commandRequest.split(" ")[1];

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/copy-file-to-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String sourcePath = labName + ":/home/" + userName + "/" + fileName;
        processBuilder.command("/usr/bin/ansible-playbook", "-v", ansibleFilePath, "-e", "labName=" + labName + " sourcePath=" + sourcePath + " destPath=" + System.getProperty("user.dir"), "-i", inventoryPath);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
        return new FileOperation().readFile(fileName);
    }

    private void handleViWrite(String labName, String userName, String commandRequest) {
        String fileName = commandRequest.split(" ")[1];
        String content = commandRequest.substring(3 + fileName.length() + 1);
        new FileOperation().writeToFile(fileName, content);

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/copy-file-to-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String sourcePath = System.getProperty("user.dir") + "/" + fileName;
        processBuilder.command("/usr/bin/ansible-playbook", "-v", ansibleFilePath, "-e", "labName=" + labName + " sourcePath=" + sourcePath + " destPath=" + labName + ":/home/" + userName, "-i", inventoryPath);
        new ExecuteLinuxProcess().executeProcess(processBuilder);
        new FileOperation().deleteFile(fileName);
    }

    private boolean isValid(String command) {
        HashSet<String> listOfValidCommands = new HashSet<>();
        for (ListOfValidCommands validcmd : ListOfValidCommands.values()) {
            listOfValidCommands.add(validcmd.name());
        }
        String[] commands = command.split(";");
        for (String cmd : commands) {
            String exec = cmd.split(" ")[0];
            if (!listOfValidCommands.contains(exec))
                return false;
        }

        return true;
    }
}
