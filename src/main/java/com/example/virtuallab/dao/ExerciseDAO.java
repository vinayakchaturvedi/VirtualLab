package com.example.virtuallab.dao;

import com.example.virtuallab.bean.Exercise;
import org.springframework.data.repository.CrudRepository;

public interface ExerciseDAO extends CrudRepository<Exercise, Integer> {
}
