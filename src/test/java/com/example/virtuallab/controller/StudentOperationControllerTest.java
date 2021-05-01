package com.example.virtuallab.controller;

import com.example.virtuallab.bean.Faculty;
import com.example.virtuallab.bean.Student;
import com.example.virtuallab.dao.StudentOperationDAO;
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
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class StudentOperationControllerTest {

    @Autowired
    private MockMvc mvc;
    @Mock
    private StudentOperationDAO studentOperationDAO;
    @InjectMocks
    private StudentOperationController studentOperationController = new StudentOperationController();

    @Before
    public void initMocks() {
        mvc = MockMvcBuilders.standaloneSetup(studentOperationController).build();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddStudent() throws Exception {
        Student student = new Student();
        student.setStudentName("Rick");
        when(studentOperationDAO.save(any(Student.class))).thenReturn(student);
        final ResultActions result =
                mvc.perform(
                        post("/addStudent")
                                .content("{ \"StudentName\": \"Rick\" }")
                                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.studentName", is("Rick")));
    }
}