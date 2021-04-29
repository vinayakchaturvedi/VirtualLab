package com.example.virtuallab.bean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student implements Cloneable {

    private static final Logger LOGGER = LoggerFactory.getLogger(Student.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;
    private String userName;
    private String studentName;
    private String emailId;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "students_Labs", joinColumns = {@JoinColumn(name = "studentId")},
            inverseJoinColumns = {@JoinColumn(name = "labId")})
    private List<Lab> labs;

    public Student() {
        labs = new ArrayList<>();
    }

    public Student(int studentId, String userName, String studentName, String emailId, String password, List<Lab> labs) {
        this.studentId = studentId;
        this.userName = userName;
        this.studentName = studentName;
        this.emailId = emailId;
        this.password = password;
        this.labs = labs;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
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
        return "Student{" +
                "studentId=" + studentId +
                ", userName='" + userName + '\'' +
                ", studentName='" + studentName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", labs=" + labs +
                '}';
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Student shallowCopy(boolean isNestingRequired) {
        try {
            Student clonedStudent = (Student) this.clone();
            clonedStudent.labs = new ArrayList<>();
            if (isNestingRequired) {
                for (Lab lab : labs) {
                    clonedStudent.labs.add(lab.shallowCopy(false));
                }
            }
            return clonedStudent;
        } catch (CloneNotSupportedException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        return null;
    }
}
