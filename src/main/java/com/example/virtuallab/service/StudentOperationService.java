package com.example.virtuallab.service;

import com.example.virtuallab.bean.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentOperationService extends CrudRepository<Student, Integer> {
}
