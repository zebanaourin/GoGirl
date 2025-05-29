package com.Fitness_Quees.fitness.Controller;

import com.Fitness_Quees.fitness.Entity.MealEntry;
import com.Fitness_Quees.fitness.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/meals")
@CrossOrigin(origins = "*")
public class MealController {

    @Autowired
    private MealService mealService;

    @PostMapping
    public ResponseEntity<MealEntry> addMeal(@RequestBody MealEntry entry){
        return ResponseEntity.ok(mealService.addMeal(entry));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<MealEntry>> getMealsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(mealService.getMealByDate(date));
    }

    // Get meals between two dates
    @GetMapping("/history")
    public List<MealEntry> getMealHistory(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        if (start != null && end != null) {
            return mealService.getMealsBetweenDates(start, end);
        } else {
            return mealService.getAllMealsSorted(); // fallback: return all meals
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMealById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }








}
