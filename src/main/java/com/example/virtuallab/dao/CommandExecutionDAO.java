package com.example.virtuallab.dao;

import com.example.virtuallab.bean.Execution;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommandExecutionDAO extends MongoRepository<Execution, Integer> {

}
