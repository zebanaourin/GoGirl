import { Component, OnInit } from '@angular/core';
import { MealEntry, CalorieService } from '../../services/calorie-service.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-calorie-tracker',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './calorie-tracker.component.html',
  styleUrl: './calorie-tracker.component.css'
})
export class CalorieTrackerComponent implements OnInit {

  meals: MealEntry[] = [];
  selectedDate: string = new Date().toISOString().slice(0, 10);
  mealHistory: MealEntry[] = [];
  showHistory: boolean = false;
  historyDays: number = 7; // default to last 7 days


  groupedMealHistory: {
    date: string;
    meals: MealEntry[];
    totalCalories: number;
  }[] = [];
  
  // Meal form inputs for each type
  newMeals: { [key in 'BREAKFAST' | 'SNACKIES1' | 'LUNCH' | 'SNACKIES2' | 'DINNER']: MealEntry } = {
    BREAKFAST: { foodName: '', calories: 0, mealType: 'BREAKFAST', date: this.selectedDate},
    SNACKIES1: { foodName: '', calories: 0, mealType: 'SNACKIES1', date: this.selectedDate },
    LUNCH: { foodName: '', calories: 0, mealType: 'LUNCH', date: this.selectedDate },
    SNACKIES2: { foodName: '', calories: 0, mealType: 'SNACKIES2', date: this.selectedDate },
    DINNER: { foodName: '', calories: 0, mealType: 'DINNER', date: this.selectedDate }
  };
  

  calorieGoal: number = 1500;

  mealTypes: Array<'BREAKFAST' | 'SNACKIES1' | 'LUNCH' | 'SNACKIES2' | 'DINNER'> = [
    'BREAKFAST', 'SNACKIES1', 'LUNCH', 'SNACKIES2', 'DINNER'
  ];

  constructor(private calorieService: CalorieService) {}

  ngOnInit(): void {
    this.loadData();
    this.loadMealHistory();
  }

  onDateChange(): void {
    this.loadData();
    this.resetMeals();
  }

  loadData(): void {
    this.calorieService.getMealsByDate(this.selectedDate).subscribe(meals => {
      this.meals = meals;
    });
  }

  submitAllMeals(): void {
    const mealsToSubmit = Object.values(this.newMeals).filter(meal =>
      meal.foodName.trim() !== '' && meal.calories > 0
    );
  
    if (mealsToSubmit.length === 0) return;
  
    let completed = 0;
    for (const meal of mealsToSubmit) {
      this.calorieService.addMeal(meal).subscribe({
        next: () => {
          completed++;
          if (completed === mealsToSubmit.length) {
            this.resetMeals();
            this.loadData();
          }
        },
        error: (err) => {
          console.error('Add Meal Error:', err);
        }
      });
    }
  }
  
  resetMeals(): void {
    this.mealTypes.forEach(type => {
      this.newMeals[type] = { 
        foodName: '', 
        calories: 0, 
        mealType: type, 
        date: this.selectedDate };
    });
  }
  

  getMealsByType(type: 'BREAKFAST' | 'SNACKIES1' | 'LUNCH' | 'SNACKIES2' | 'DINNER'): MealEntry[] {
    return this.meals.filter(meal => meal.mealType === type);
  }

  getConsumedCalories(): number {
    return this.meals.reduce((total, meal) => total + meal.calories, 0);
  }

  loadMealHistory(): void {
    this.calorieService.getMealHistory().subscribe(data => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.historyDays);
  
      const grouped = new Map<string, MealEntry[]>();
  
      data.forEach(meal => {
        const mealDate = new Date(meal.date);
        if (mealDate >= cutoffDate) {
          if (!grouped.has(meal.date)) {
            grouped.set(meal.date, []);
          }
          grouped.get(meal.date)!.push(meal);
        }
      });
  
      this.groupedMealHistory = Array.from(grouped.entries()).map(([date, meals]) => ({
        date,
        meals,
        totalCalories: meals.reduce((sum, meal) => sum + meal.calories, 0)
      })).sort((a, b) => b.date.localeCompare(a.date)); // recent first
    });
  }
  
  onHistoryDaysChange(): void {
    this.loadMealHistory();
  }
  
  deleteMeal(mealId: number | undefined, groupIndex: number): void {
    if (mealId === undefined) return;
  
    this.calorieService.deleteMeal(mealId).subscribe(() => {
      const group = this.groupedMealHistory[groupIndex];
      group.meals = group.meals.filter(meal => meal.id !== mealId);
      group.totalCalories = group.meals.reduce((sum, meal) => sum + meal.calories, 0);
  
      if (group.meals.length === 0) {
        this.groupedMealHistory.splice(groupIndex, 1);
      }
    });
  }
  
  
  
}
