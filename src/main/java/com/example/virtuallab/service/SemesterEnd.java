package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.dao.LabOperationDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class SemesterEnd {

    private static final Logger LOGGER = LoggerFactory.getLogger(SemesterEnd.class);

    @Autowired
    private LabOperationDAO labOperationDAO;
    private ExecuteLinuxProcess executeLinuxProcess;
    @Value("${lab.duration.days}")
    private int labDurationDays;


    public SemesterEnd() {
        executeLinuxProcess = new ExecuteLinuxProcess();
    }

    public void checkIfAnyLabNeedsToBeDestroyed() {
        Iterable<Lab> all = labOperationDAO.findAll();
        List<Lab> labToBeRemoved = new ArrayList<>();
        LocalDate today = LocalDate.now();

        all.forEach(lab -> {
                    LocalDate lastDate = lab.getCreationDate().plusDays(labDurationDays);
                    if (today.isAfter(lastDate)) {
                        labToBeRemoved.add(lab);
                    }
                }
        );

        if(labToBeRemoved.isEmpty()) {
            LOGGER.info("No lab expired today");
        }

        for (Lab lab : labToBeRemoved) {
            LOGGER.info("Removing " + lab.getLabName() + " lab");
            destroyLabs(lab.getLabName());
            labOperationDAO.delete(lab);
        }
    }

    private void destroyLabs(String labName) {
        ProcessBuilder processBuilder = new ProcessBuilder();
        String ansibleFilePath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/destroy-lab-containers.yml";
        String inventoryPath = System.getProperty("user.dir") + "/src/main/resources/ansibleplaybooks/hosts";
        processBuilder.command("/usr/bin/ansible-playbook", ansibleFilePath, "-e", "labName=" + labName, "-i", inventoryPath);
        this.executeLinuxProcess.executeProcess(processBuilder);
    }

}
