package com.example.virtuallab.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ExecuteLinuxProcess {

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
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result.toString();
    }
}
