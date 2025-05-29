package com.Fitness_Quees.fitness.Service;

import com.Fitness_Quees.fitness.Entity.Routine;
import com.Fitness_Quees.fitness.Entity.Workout;
import com.Fitness_Quees.fitness.Entity.WorkoutSet;
import com.Fitness_Quees.fitness.Repository.RoutineRepository;
import com.Fitness_Quees.fitness.Repository.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private RoutineRepository workoutRepository;
    private WorkoutRepository workoutRepository1;
    private WorkoutSet workoutSet;

    public List<Routine> getAllRoutines(){
        return workoutRepository.findAll();
    }

    public Optional<Routine> getRoutineByDate(Date date){
        return workoutRepository.findByDate(date);
    }

    public Routine saveRoutine(Routine routine) {
        for (Workout workout : routine.getWorkouts()) {
            workout.setRoutine(routine); // Set the parent reference
            for (WorkoutSet set : workout.getSets()) {
                set.setWorkout(workout); // Set the parent reference
            }
        }
        return workoutRepository.save(routine);
    }


    public Routine updateRoutine(Date date, Routine updatedRoutine){
        return workoutRepository.findByDate(date)
                .map(existing -> {
                    updatedRoutine.setId(existing.getId());
                    return workoutRepository.save((updatedRoutine));
                }).orElse(null);
    }

    // WorkoutService.java
    @Transactional
    public boolean deleteRoutine(Date date) {
        Optional<Routine> routine = workoutRepository.findByDate(date);
        if(routine.isPresent()) {
            workoutRepository.deleteByDate(date);
            return true;
        }
        return false;
    }



}
