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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "students_Exercise_Completed", joinColumns = {@JoinColumn(name = "studentId")},
            inverseJoinColumns = {@JoinColumn(name = "exerciseId")})
    private List<Exercise> exercisesCompleted;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "students_Exercise_Pending", joinColumns = {@JoinColumn(name = "studentId")},
            inverseJoinColumns = {@JoinColumn(name = "exerciseId")})
    private List<Exercise> exercisesPending;

    public Student() {
        labs = new ArrayList<>();
        exercisesCompleted = new ArrayList<>();
        exercisesPending = new ArrayList<>();
    }

    public Student(int studentId, String userName, String studentName, String emailId, String password, List<Lab> labs, List<Exercise> exercisesCompleted, List<Exercise> exercisesPending) {
        this.studentId = studentId;
        this.userName = userName;
        this.studentName = studentName;
        this.emailId = emailId;
        this.password = password;
        this.labs = labs;
        this.exercisesCompleted = exercisesCompleted;
        this.exercisesPending = exercisesPending;
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

    public List<Exercise> getExercisesCompleted() {
        return exercisesCompleted;
    }

    public void setExercisesCompleted(List<Exercise> exercises) {
        this.exercisesCompleted = exercises;
    }

    public List<Exercise> getExercisesPending() {
        return exercisesPending;
    }

    public void setExercisesPending(List<Exercise> exercisesPending) {
        this.exercisesPending = exercisesPending;
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
                ", completedExercise=" + exercisesCompleted.size() +
                ", pendingExercise=" + exercisesPending.size() +
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
            clonedStudent.exercisesCompleted = new ArrayList<>();
            clonedStudent.exercisesPending = new ArrayList<>();
            if (isNestingRequired) {
                for (Lab lab : labs) {
                    clonedStudent.labs.add(lab.shallowCopy(false));
                }
                for (Exercise exercise : exercisesCompleted) {
                    clonedStudent.exercisesCompleted.add(exercise.shallowCopy(false));
                }
                for (Exercise exercise : exercisesPending) {
                    clonedStudent.exercisesPending.add(exercise.shallowCopy(false));
                }
            }
            return clonedStudent;
        } catch (CloneNotSupportedException e) {
            LOGGER.error(e.getLocalizedMessage());
        }
        return null;
    }
}
