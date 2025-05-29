package com.Fitness_Quees.fitness.Repository;

import com.Fitness_Quees.fitness.Entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout,Long> {
}
