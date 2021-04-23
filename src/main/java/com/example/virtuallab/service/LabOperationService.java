package com.example.virtuallab.service;

import com.example.virtuallab.bean.Lab;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface LabOperationService extends CrudRepository<Lab, Integer> {
}
