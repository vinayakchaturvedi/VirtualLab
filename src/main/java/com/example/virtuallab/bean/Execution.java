package com.example.virtuallab.bean;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Document
public class Execution {

    @Id
    private ObjectId id;
    private String userName;
    private String labName;
    private String command;
    private String result;
    private LocalDateTime time;
    private boolean successfulExecution;

    public Execution() {
    }

    public Execution(ObjectId id, String userName, String labName, String command, String result, LocalDateTime time, boolean successfulExecution) {
        this.id = id;
        this.userName = userName;
        this.labName = labName;
        this.command = command;
        this.result = result;
        this.time = time;
        this.successfulExecution = successfulExecution;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    public boolean isSuccessfulExecution() {
        return successfulExecution;
    }

    public void setSuccessfulExecution(boolean successfulExecution) {
        this.successfulExecution = successfulExecution;
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

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Execution{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", labName='" + labName + '\'' +
                ", command='" + command + '\'' +
                ", result='" + result + '\'' +
                ", time=" + time +
                ", successfulExecution=" + successfulExecution +
                '}';
    }
}
