package com.example.virtuallab.service;

import com.example.virtuallab.bean.Faculty;
import org.springframework.data.repository.CrudRepository;

public interface FacultyOperationService extends CrudRepository<Faculty, Integer> {

}
