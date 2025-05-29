package com.Fitness_Quees.fitness.Entity;

import com.Fitness_Quees.fitness.Emuns.MealType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MealEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodName;
    private int calories;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    private LocalDate date;

    private String userId;

}
