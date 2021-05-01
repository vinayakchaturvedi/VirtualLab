package com.example.virtuallab.service;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.dao.CommandExecutionDAO;
import com.example.virtuallab.dao.LabOperationDAO;
import com.example.virtuallab.dao.StudentOperationDAO;
import com.example.virtuallab.utils.Constants;
import com.example.virtuallab.utils.FileOperation;
import com.example.virtuallab.utils.ListOfValidCommands;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;

@Component
public class StudentOperationServiceUtil {

    @Autowired
    private LabOperationDAO labOperationDAO;
    @Autowired
    private StudentOperationDAO studentOperationDAO;
    @Autowired
    private CommandExecutionDAO commandExecutionDAO;
    private ExecuteLinuxProcess executeLinuxProcess;

    public StudentOperationServiceUtil() {
        executeLinuxProcess = new ExecuteLinuxProcess();
    }

    public StudentOperationServiceUtil(ExecuteLinuxProcess executeLinuxProcess) {
        this.executeLinuxProcess = executeLinuxProcess;
    }


    public Lab labRegistration(JsonNode jsonNode) {
        int studentId = jsonNode.get("studentId").asInt();
        int labId = jsonNode.get("labId").asInt();


        if (!studentOperationDAO.findById(studentId).isPresent() ||
                !labOperationDAO.findById(labId).isPresent()) return null;

        Student student = studentOperationDAO.findById(studentId).orElseGet(null);
        Lab lab = labOperationDAO.findById(labId).orElseGet(null);

        if (student == null || lab == null) return null;

        student.getLabs().add(lab);
        lab.setStudentsRegistered(lab.getStudentsRegistered() + 1);
        studentOperationDAO.save(student);
        labOperationDAO.save(lab);
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
        this.executeLinuxProcess.executeProcess(processBuilder);
    }

    public Execution executeCommand(Execution execution) {
        /*if (!isValid(command)) {
            return "Invalid Permission or Command";
        }*/
        String labName = execution.getLabName();
        String userName = execution.getUserName();
        String commandRequest = execution.getCommand();

        String linuxCommand = commandRequest.split(" ")[0];

        if (commandRequest.split(" ")[0].equals("viWrite")) {
            handleViWrite(labName, userName, commandRequest);
            execution.setResult("Done");
            return execution;
        } else if (commandRequest.split(" ")[0].equals("viRead")) {
            return handleViRead(execution);
        }

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/execute-command-in-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String command = "bash -c \\\"cd /home/" + userName + " && " + commandRequest + "\\\"";
        command = "'" + command + "'";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName + " command=" + command, "-i", inventoryPath);
        this.executeLinuxProcess.executeProcess(processBuilder);
        new FileOperation().readJsonFile("/home/vinayak/output.json", execution);
        if (Constants.commandToStore.contains(linuxCommand)) {
            storeExecutionToMongoDB(execution);
        }
        return execution;
    }

    private void storeExecutionToMongoDB(Execution execution) {
        execution.setTime(LocalDateTime.now());
        commandExecutionDAO.save(execution);
    }

    private Execution handleViRead(Execution execution) {
        String labName = execution.getLabName();
        String userName = execution.getUserName();
        String commandRequest = execution.getCommand();

        String fileName = commandRequest.split(" ")[1];
        execution.setCommand("cat " + fileName);
        execution = executeCommand(execution);
        if (!execution.isSuccessfulExecution()) {
            execution.setCommand("touch " + fileName);
            execution = executeCommand(execution);
            execution.setCommand("cat " + fileName);
            execution = executeCommand(execution);
        }
        return execution;
    }

    private void handleViWrite(String labName, String userName, String commandRequest) {
        String fileName = commandRequest.split(" ")[1];
        String content = commandRequest.substring(7 + fileName.length() + 2);
        new FileOperation().writeToFile(fileName, content);

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/copy-file-to-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String sourcePath = System.getProperty("user.dir") + "/" + fileName;
        processBuilder.command("/usr/bin/ansible-playbook", "-v", ansibleFilePath, "-e", "labName=" + labName + " sourcePath=" + sourcePath + " destPath=" + labName + ":/home/" + userName, "-i", inventoryPath);
        this.executeLinuxProcess.executeProcess(processBuilder);
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
