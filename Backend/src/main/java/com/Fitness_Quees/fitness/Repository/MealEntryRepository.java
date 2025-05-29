package com.Fitness_Quees.fitness.Repository;

import com.Fitness_Quees.fitness.Emuns.MealType;
import com.Fitness_Quees.fitness.Entity.MealEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealEntryRepository extends JpaRepository<MealEntry, Long> {
    List<MealEntry> findByDate(LocalDate date);
    List<MealEntry> findByDateAndMealType(LocalDate date, MealType mealType);
    List<MealEntry> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<MealEntry> findAllByOrderByDateDesc();

}
