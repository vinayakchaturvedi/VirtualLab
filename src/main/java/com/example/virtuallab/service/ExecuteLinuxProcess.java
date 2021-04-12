package com.example.virtuallab.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ExecuteLinuxProcess {

    public void executeProcess(ProcessBuilder processBuilder) {
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
