package com.Fitness_Quees.fitness.Controller;


import com.Fitness_Quees.fitness.Entity.Routine;
import com.Fitness_Quees.fitness.Service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/routines")
@CrossOrigin(origins = "*")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping
    public List<Routine> getAllRoutines(){
        return workoutService.getAllRoutines();
    }

    @GetMapping("/{date}")
    public ResponseEntity<Routine> getRoutineByDate(@PathVariable Date date){
        return workoutService.getRoutineByDate(date).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Routine> createRoutine(@RequestBody Routine routine){
        return ResponseEntity.ok(workoutService.saveRoutine((routine)));
    }

    @PutMapping("/{date}")
    public ResponseEntity<Routine> updateRoutine(@PathVariable Date date, @RequestBody Routine routine){
        Routine routine1 = workoutService.updateRoutine(date, routine);
        return (routine1 != null) ? ResponseEntity.ok(routine1) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{date}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        boolean deleted = workoutService.deleteRoutine(date);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }




}
