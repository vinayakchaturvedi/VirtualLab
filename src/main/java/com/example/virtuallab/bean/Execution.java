package com.example.virtuallab.bean;

public class Execution {

    private String command;
    private String result;

    public Execution() {
    }

    public Execution(String command, String result) {
        this.command = command;
        this.result = result;
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
                "command='" + command + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}
