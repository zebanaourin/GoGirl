package com.Fitness_Quees.fitness.Repository;

import com.Fitness_Quees.fitness.Entity.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SetsRepository extends JpaRepository<WorkoutSet , Long> {
}
