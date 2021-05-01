package com.example.virtuallab.service;

import org.junit.Assert;
import org.junit.Test;

public class ExecuteLinuxProcessTest {

    private final ExecuteLinuxProcess executeLinuxProcess = new ExecuteLinuxProcess();

    @Test
    public void testExecuteProcessValid() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("pwd");
        Assert.assertEquals(System.getProperty("user.dir") + "\n", executeLinuxProcess.executeProcess(processBuilder));
    }

    @Test
    public void testExecuteProcessInvalid() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("pwde");
        Assert.assertEquals("Cannot run program \"pwde\": error=2, No such file or directory", executeLinuxProcess.executeProcess(processBuilder));
    }
}