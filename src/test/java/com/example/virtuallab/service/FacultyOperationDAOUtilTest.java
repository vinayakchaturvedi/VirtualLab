package com.example.virtuallab.service;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.dao.FacultyOperationDAO;
import com.example.virtuallab.dao.LabOperationDAO;
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

public class FacultyOperationDAOUtilTest {

    @Mock
    FacultyOperationDAO facultyOperationDAO;
    @Mock
    LabOperationDAO labOperationDAO;
    @Mock
    ExecuteLinuxProcess executeLinuxProcessMock;
    @Mock
    JsonNode jsonNode;
    @InjectMocks
    FacultyOperationServiceUtil facultyOperationServiceUtil = new FacultyOperationServiceUtil(executeLinuxProcessMock);

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSaveLabValid() {
        Faculty faculty = new Faculty();
        Lab lab = new Lab();
        lab.setLabName("java");

        when(jsonNode.get(eq("facultyId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labName"))).thenReturn(jsonNode);
        when(jsonNode.asText()).thenReturn("java");
        when(jsonNode.get(eq("studentsRegistered"))).thenReturn(jsonNode);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        when(facultyOperationDAO.findById(eq(1))).thenReturn(Optional.of(faculty));
        when(labOperationDAO.save(any(Lab.class))).thenReturn(lab);

        Assert.assertEquals(lab.getLabName(), facultyOperationServiceUtil.saveLab(jsonNode).getLabName());
    }

    @Test
    public void testSaveWrongLabInValid() {
        Faculty faculty = new Faculty();
        Lab lab = new Lab();
        lab.setLabName("AutoCAD");

        when(jsonNode.get(eq("facultyId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labName"))).thenReturn(jsonNode);
        when(jsonNode.asText()).thenReturn("AutoCAD");
        when(jsonNode.get(eq("studentsRegistered"))).thenReturn(jsonNode);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        when(facultyOperationDAO.findById(eq(1))).thenReturn(Optional.of(faculty));
        when(labOperationDAO.save(any(Lab.class))).thenReturn(lab);

        Assert.assertNull(facultyOperationServiceUtil.saveLab(jsonNode));
    }

    @Test
    public void testSaveFacultyNotExistInValid() {
        Faculty faculty = new Faculty();
        Lab lab = new Lab();
        lab.setLabName("AutoCAD");

        when(jsonNode.get(eq("facultyId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("labName"))).thenReturn(jsonNode);
        when(jsonNode.asText()).thenReturn("AutoCAD");
        when(jsonNode.get(eq("studentsRegistered"))).thenReturn(jsonNode);
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        when(facultyOperationDAO.findById(eq(1))).thenReturn(Optional.empty());
        when(labOperationDAO.save(any(Lab.class))).thenReturn(lab);

        Assert.assertNull(facultyOperationServiceUtil.saveLab(jsonNode));
    }


    @Test
    public void testExecuteAnsiblePlaybookToCreateContainerOnInstitutionServer() {
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        Assert.assertEquals("Success", facultyOperationServiceUtil.executeAnsiblePlaybookToCreateContainerOnInstitutionServer("java"));
    }


    @Test
    public void testCreateAndPushDockerImageToDockerHub() {
        when(executeLinuxProcessMock.executeProcess(any(ProcessBuilder.class))).thenReturn("Success");
        Assert.assertEquals("Success", facultyOperationServiceUtil.createAndPushDockerImageToDockerHub("java"));
    }
}