package com.example.virtuallab.bean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Exercise implements Cloneable {

    private static final Logger LOGGER = LoggerFactory.getLogger(Exercise.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int exerciseId;
    private String question;
    @ManyToOne
    @JoinColumn(name = "labId", nullable = false)
    private Lab lab;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "exercisesCompleted")
    private List<Student> studentsCompleted;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "exercisesPending")
    private List<Student> studentsPending;

    public Exercise() {
        studentsCompleted = new ArrayList<>();
        studentsPending = new ArrayList<>();
    }

    public Exercise(int exerciseId, String question, Lab lab, List<Student> studentsCompleted, List<Student> studentsPending) {
        this.exerciseId = exerciseId;
        this.question = question;
        this.lab = lab;
        this.studentsCompleted = studentsCompleted;
        this.studentsPending = studentsPending;
    }

    public int getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(int exerciseId) {
        this.exerciseId = exerciseId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public List<Student> getStudentsCompleted() {
        return studentsCompleted;
    }

    public void setStudentsCompleted(List<Student> students) {
        this.studentsCompleted = students;
    }

    public List<Student> getStudentsPending() {
        return studentsPending;
    }

    public void setStudentsPending(List<Student> studentsPending) {
        this.studentsPending = studentsPending;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Exercise shallowCopy(boolean isNestingRequired) {
        try {
            Exercise clonedExercise = (Exercise) this.clone();
            if (isNestingRequired) {
                clonedExercise.studentsCompleted = new ArrayList<>();
                for (Student student : studentsCompleted) {
                    clonedExercise.studentsCompleted.add(student.shallowCopy(false));
                }
                clonedExercise.studentsPending = new ArrayList<>();
                for (Student student : studentsPending) {
                    clonedExercise.studentsPending.add(student.shallowCopy(false));
                }
                clonedExercise.lab = lab.shallowCopy(false);
            } else {
                clonedExercise.studentsCompleted = new ArrayList<>();
                clonedExercise.studentsPending = new ArrayList<>();
                clonedExercise.lab = null;
            }
            return clonedExercise;
        } catch (CloneNotSupportedException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        return null;
    }
}
