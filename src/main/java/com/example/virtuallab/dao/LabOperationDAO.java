package com.example.virtuallab.dao;

import com.example.virtuallab.bean.Lab;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface LabOperationDAO extends CrudRepository<Lab, Integer> {
}
