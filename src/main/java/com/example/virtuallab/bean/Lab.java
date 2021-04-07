package com.example.virtuallab.bean;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document
public class Lab implements Cloneable {

    @Id
    public int id;
    private String labName;
    private int studentsRegistered;
    private Faculty faculty;
    private List<Student> students;

    public Lab() {
        students = new ArrayList<>();
    }

    public Lab(int id, String labName, int studentsRegistered, Faculty faculty, List<Student> students) {
        this.id = id;
        this.labName = labName;
        this.studentsRegistered = studentsRegistered;
        this.faculty = faculty;
        this.students = students;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public int getStudentsRegistered() {
        return studentsRegistered;
    }

    public void setStudentsRegistered(int studentsRegistered) {
        this.studentsRegistered = studentsRegistered;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return "Lab{" +
                "id=" + id +
                ", labName='" + labName + '\'' +
                ", studentsRegistered=" + studentsRegistered +
                '}';
    }


    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Lab shallowCopy() {
        try {
            Lab clonedLab = (Lab) this.clone();
            clonedLab.students = null;
            clonedLab.faculty = null;
            return clonedLab;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }

}
