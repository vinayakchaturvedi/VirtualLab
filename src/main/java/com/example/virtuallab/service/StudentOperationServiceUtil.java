package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
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

    /*public static void main(String[] args) {

        //docker exec java bash -c "cd /home/MT2020046 && touch Hello.java"
        //String command = "bash -c \\\"cd /home/MT2020046 && touch Hello.java && echo 'public\tclass\tHello\t{\tpublic\tstatic\tvoid\tmain(String[]\targs)\t{\tSystem.out.println(\"Hello World\");\t}}' > Hello.java\\\"";
        String command = "bash -c \\\"cd /home/MT2020046 && touch Hello.java && echo 'public\tclass\tHello\t{\tpublic\tstatic\tvoid\tmain(String[]\targs)\t{\tSystem.out.println(\\\\\"Hello\tWorld\\\\\");\t}}' > Hello.java\\\"";
        String command3 = "echo \"public class\" > Hello.java\\\"";
        new StudentOperationServiceUtil().executeCommand("java", command);
    }*/


    /*
        Some examples of commandRequest:
        1. touch Hello.java
        2. touch Hello.java && echo 'public\tclass\tHello\t{\tpublic\tstatic\tvoid\tmain(String[]\targs)\t{\tSystem.out.println(\"Hello World\");\t}}' > Hello.java
     */
    public String executeCommand(String labName, String userName, String commandRequest) {
        /*if (!isValid(command)) {
            return "Invalid Permission or Command";
        }*/

        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/execute-command-in-container.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        String command = "bash -c \\\"cd /home/" + userName + " && " + commandRequest + "\\\"";
        command = "'" + command + "'";
        processBuilder.command("/usr/bin/ansible-playbook", "-v", ansibleFilePath, "-e", "labName=" + labName + " command=" + command, "-i", inventoryPath);
        String response = new ExecuteLinuxProcess().executeProcess(processBuilder);
        response = response.substring(response.indexOf("TASK [Execute specified command inside the container]"));
        String output = "\"shell_result.stdout_lines\": [";
        int indexStart = response.indexOf(output);
        int indexEnd = response.indexOf("PLAY RECAP");
        if (indexStart == -1) {
            String error = "\"stderr\": \"Error: ";
            indexStart = response.indexOf(error);
            indexEnd = response.indexOf("\", \"stderr_lines\"");
            if (indexStart == -1) return "";
            return "Error: " + response.substring(indexStart + error.length(), indexEnd);
        }
        if (response.length() <= indexStart + output.length() + 10 || indexEnd - 11 <= indexStart + output.length() + 10)
            return "";
        return "Output: " + response.substring(indexStart + output.length() + 10, indexEnd - 11);
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
