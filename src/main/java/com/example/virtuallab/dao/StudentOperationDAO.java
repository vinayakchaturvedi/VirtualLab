package com.example.virtuallab.dao;

import com.example.virtuallab.bean.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentOperationDAO extends CrudRepository<Student, Integer> {
}
