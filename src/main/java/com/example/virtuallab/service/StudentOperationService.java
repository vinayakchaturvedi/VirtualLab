package com.example.virtuallab.service;

import com.example.virtuallab.bean.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentOperationService extends MongoRepository<Student, Integer> {
}
