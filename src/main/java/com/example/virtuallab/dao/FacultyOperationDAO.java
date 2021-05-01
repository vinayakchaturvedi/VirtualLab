package com.example.virtuallab.dao;

import com.example.virtuallab.bean.Faculty;
import org.springframework.data.repository.CrudRepository;

public interface FacultyOperationDAO extends CrudRepository<Faculty, Integer> {

}
