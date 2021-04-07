package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabOperationService extends MongoRepository<Lab, Integer> {
}
