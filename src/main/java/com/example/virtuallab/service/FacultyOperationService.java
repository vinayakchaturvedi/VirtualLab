package com.example.virtuallab.service;

import com.example.virtuallab.bean.Faculty;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacultyOperationService extends MongoRepository<Faculty, Integer> {

}
