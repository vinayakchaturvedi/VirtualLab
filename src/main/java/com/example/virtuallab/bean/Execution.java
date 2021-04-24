package com.example.virtuallab.bean;

public class Execution {

    private String userName;
    private String labName;
    private String command;
    private String result;

    public Execution() {
    }

    public Execution(String userName, String labName, String command, String result) {
        this.userName = userName;
        this.labName = labName;
        this.command = command;
        this.result = result;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Execution{" +
                "userName='" + userName + '\'' +
                ", labName='" + labName + '\'' +
                ", command='" + command + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}
