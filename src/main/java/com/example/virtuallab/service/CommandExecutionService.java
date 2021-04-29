package com.example.virtuallab.service;

import com.example.virtuallab.bean.Execution;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommandExecutionService extends MongoRepository<Execution, Integer> {

}
