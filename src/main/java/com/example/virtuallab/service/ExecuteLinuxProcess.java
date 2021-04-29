package com.example.virtuallab.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExecuteLinuxProcess {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExecuteLinuxProcess.class);

    public String executeProcess(ProcessBuilder processBuilder) {
        StringBuffer result = new StringBuffer();
        try {
            Process process = processBuilder.start();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            BufferedReader reader = new BufferedReader((new InputStreamReader(process.getInputStream())));
            result = new StringBuffer();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                result.append(line).append("\n");
            }
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            LOGGER.info("Ansible output: " + result);
        } catch (Exception e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        return result.toString();
    }
}
