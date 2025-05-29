package com.Fitness_Quees.fitness.Service;

import com.Fitness_Quees.fitness.Entity.MealEntry;
import com.Fitness_Quees.fitness.Repository.MealEntryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class MealService {

    @Autowired
    private MealEntryRepository mealEntryRepository;
    private Date date;

    public MealEntry addMeal(MealEntry entry){
        return mealEntryRepository.save(entry);
    }

    public List<MealEntry> getMealByDate(LocalDate date){
        return mealEntryRepository.findByDate(date);
    }

    public List<MealEntry> getMealsBetweenDates(LocalDate start, LocalDate end) {
        return mealEntryRepository.findByDateBetween(start, end);
    }

    public List<MealEntry> getAllMealsSorted() {
        return mealEntryRepository.findAllByOrderByDateDesc();
    }

    public void deleteMealById(Long id) {
        mealEntryRepository.deleteById(id);
    }









}
