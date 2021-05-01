package com.example.virtuallab.service;

import com.example.virtuallab.bean.Execution;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.dao.CommandExecutionDAO;
import com.example.virtuallab.dao.LabOperationDAO;
import com.example.virtuallab.dao.StudentOperationDAO;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

public class StudentOperationDAOUtilTest {

    @Mock
    private LabOperationDAO labOperationDAO;
    @Mock
    private StudentOperationDAO studentOperationDAO;
    @Mock
    private CommandExecutionDAO commandExecutionDAO;
    @Mock
    ExecuteLinuxProcess executeLinuxProcessMock;
    @Mock
    JsonNode jsonNode;
    @InjectMocks
    private StudentOperationServiceUtil studentOperationServiceUtil = new StudentOperationServiceUtil(executeLinuxProcessMock);

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLabRegistrationValid() {
        Lab lab = new Lab();
        lab.setLabName("java");
        Student student = new Student();

        when(jsonNode.get(eq("studentId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labId"))).thenReturn(jsonNode);

        when(studentOperationDAO.findById(1)).thenReturn(Optional.of(student));
        when(labOperationDAO.findById(1)).thenReturn(Optional.of(lab));
        when(studentOperationDAO.save(student)).thenReturn(student);
        when(labOperationDAO.save(lab)).thenReturn(lab);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        Assert.assertEquals(lab.getLabName(), studentOperationServiceUtil.labRegistration(jsonNode).getLabName());
    }

    @Test
    public void testLabRegistrationLabNotExistInValid() {
        Lab lab = new Lab();
        lab.setLabName("AutoCAD");
        Student student = new Student();

        when(jsonNode.get(eq("studentId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labId"))).thenReturn(jsonNode);

        when(studentOperationDAO.findById(1)).thenReturn(Optional.of(student));
        when(labOperationDAO.findById(1)).thenReturn(Optional.empty());
        when(studentOperationDAO.save(student)).thenReturn(student);
        when(labOperationDAO.save(lab)).thenReturn(lab);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        Assert.assertNull(studentOperationServiceUtil.labRegistration(jsonNode));
    }

    @Test
    public void testLabRegistrationStudentNotExistInValid() {
        Lab lab = new Lab();
        lab.setLabName("AutoCAD");
        Student student = new Student();

        when(jsonNode.get(eq("studentId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labId"))).thenReturn(jsonNode);

        when(studentOperationDAO.findById(1)).thenReturn(Optional.empty());
        when(labOperationDAO.findById(1)).thenReturn(Optional.of(lab));
        when(studentOperationDAO.save(student)).thenReturn(student);
        when(labOperationDAO.save(lab)).thenReturn(lab);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        Assert.assertNull(studentOperationServiceUtil.labRegistration(jsonNode));
    }
}