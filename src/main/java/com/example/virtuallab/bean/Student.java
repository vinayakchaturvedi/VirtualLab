package com.example.virtuallab.bean;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document
public class Student implements Cloneable {

    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String emailId;
    private long contactNumber;
    private List<Lab> labs;

    public Student() {
        labs = new ArrayList<>();
    }

    public Student(int id, String firstName, String lastName, String emailId, long contactNumber, List<Lab> labs) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.contactNumber = contactNumber;
        this.labs = labs;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public long getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(long contactNumber) {
        this.contactNumber = contactNumber;
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
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", contactNumber=" + contactNumber +
                ", labs=" + labs +
                '}';
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Student shallowCopy() {
        try {
            Student clonedStudent = (Student) this.clone();
            clonedStudent.labs = new ArrayList<>();

            for (Lab lab : labs) {
                clonedStudent.labs.add(lab.shallowCopy());
            }
            return clonedStudent;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
