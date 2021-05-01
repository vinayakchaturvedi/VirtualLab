package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Lab;
import com.example.virtuallab.dao.CommandExecutionDAO;
import com.example.virtuallab.dao.FacultyOperationDAO;
import com.example.virtuallab.dao.LabOperationDAO;
import com.example.virtuallab.service.FacultyOperationServiceUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class FacultyOperationControllerTest {


    @Autowired
    private MockMvc mvc;
    @Mock
    private FacultyOperationDAO facultyOperationDAO;
    @Mock
    private LabOperationDAO labOperationDAO;
    @Mock
    private FacultyOperationServiceUtil util;
    @Mock
    private CommandExecutionDAO commandExecutionDAO;
    @InjectMocks
    private FacultyOperationController facultyOperationController = new FacultyOperationController();

    @Before
    public void initMocks() {
        mvc = MockMvcBuilders.standaloneSetup(facultyOperationController).build();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddFaculty() throws Exception {
        Faculty faculty = new Faculty();
        faculty.setFacultyName("John");
        when(facultyOperationDAO.save(any(Faculty.class))).thenReturn(faculty);
        final ResultActions result =
                mvc.perform(
                        post("/addFaculty")
                                .content("{ \"facultyName\": \"John\" }")
                                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.facultyName", is("John")));
    }

    @Test
    public void testAddLab() throws Exception {
        Lab lab = new Lab();
        Faculty faculty = new Faculty();
        lab.setLabName("Java");
        lab.setFaculty(faculty);
        when(util.saveLab(any(JsonNode.class))).thenReturn(lab);
        final ResultActions result =
                mvc.perform(
                        post("/addLab")
                                .content("{ \"labName\": \"Java\" }")
                                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.labName", is("Java")));
    }
}