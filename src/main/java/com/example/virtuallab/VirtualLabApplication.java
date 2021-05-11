package com.example.virtuallab;

import com.example.virtuallab.service.ExecuteLinuxProcess;
import com.example.virtuallab.service.SemesterEnd;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class VirtualLabApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(VirtualLabApplication.class, args);
        SemesterEnd semesterEnd = context.getBean(SemesterEnd.class);
        semesterEnd.checkIfAnyLabNeedsToBeDestroyed();
        startNpm();
    }

    private static void startNpm() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("npm", "start", "--prefix", System.getProperty("user.dir") + "/src/main/webapp/virtual-lab-ui/");
        new ExecuteLinuxProcess().executeProcess(processBuilder);
    }

}
