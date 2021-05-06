package com.example.virtuallab.bean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Lab implements Cloneable {

    private static final Logger LOGGER = LoggerFactory.getLogger(Lab.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int labId;
    private String labName;
    private int studentsRegistered;
    private LocalDate creationDate;
    @ManyToOne
    @JoinColumn(name = "facultyId", nullable = false)
    private Faculty faculty;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "labs")
    private List<Student> students;

    @OneToMany(mappedBy = "lab", cascade = CascadeType.ALL)
    private List<Exercise> exercises;

    public Lab() {
        students = new ArrayList<>();
        exercises = new ArrayList<>();
    }

    public Lab(String labName, int studentsRegistered, Faculty faculty, List<Student> students, List<Exercise> exercises) {
        this.labName = labName;
        this.studentsRegistered = studentsRegistered;
        this.faculty = faculty;
        this.students = students;
        this.creationDate = LocalDate.now();
        this.exercises = exercises;
    }

    public int getLabId() {
        return labId;
    }

    public void setLabId(int labId) {
        this.labId = labId;
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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    @Override
    public String toString() {
        return "Lab{" +
                "labId=" + labId +
                ", labName='" + labName + '\'' +
                ", studentsRegistered=" + studentsRegistered +
                ", creationDate=" + creationDate +
                ", faculty=" + faculty.getFacultyName() +
                '}';
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Lab shallowCopy(boolean isNestingRequired) {
        try {
            Lab clonedLab = (Lab) this.clone();
            clonedLab.students = null;
            clonedLab.exercises = new ArrayList<>();
            if (isNestingRequired) {
                clonedLab.faculty = faculty.shallowCopy(false);
                for (Exercise exercise : exercises) {
                    clonedLab.exercises.add(exercise.shallowCopy(false));
                }
            } else {
                clonedLab.faculty = null;
            }
            return clonedLab;
        } catch (CloneNotSupportedException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        return null;
    }

}
