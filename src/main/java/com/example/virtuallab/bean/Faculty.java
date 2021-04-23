package com.example.virtuallab.bean;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Faculty implements Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int facultyId;
    private String userName;
    private String facultyName;
    private String emailId;
    private String password;
    @OneToMany(mappedBy = "faculty", cascade = CascadeType.ALL)
    private List<Lab> labs = new ArrayList<>();

    public Faculty() {
        labs = new ArrayList<>();
    }

    public Faculty(int facultyId, String userName, String facultyName, String emailId, String password, List<Lab> labs) {
        this.facultyId = facultyId;
        this.userName = userName;
        this.facultyName = facultyName;
        this.emailId = emailId;
        this.password = password;
        this.labs = labs;
    }

    public int getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(int facultyId) {
        this.facultyId = facultyId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Lab> getLabs() {
        return labs;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    @Override
    public String toString() {
        return "Faculty{" +
                "facultyId=" + facultyId +
                ", userName='" + userName + '\'' +
                ", facultyName='" + facultyName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", labs=" + labs +
                '}';
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Faculty shallowCopy(boolean isNestingRequired) {
        try {
            Faculty clonedFaculty = (Faculty) this.clone();
            clonedFaculty.labs = new ArrayList<>();
            if (isNestingRequired) {
                for (Lab lab : labs) {
                    clonedFaculty.labs.add(lab.shallowCopy(false));
                }
            }
            return clonedFaculty;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
