import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MealEntry{
  id? : number;
  foodName: string;
  calories: number;
  mealType: 'BREAKFAST'| 'SNACKIES1' | 'LUNCH' | 'SNACKIES2'| 'DINNER';
  date : string;
}


@Injectable({
  providedIn: 'root'
})

export class CalorieService {

  private apiUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) { }


  addMeal(meal: MealEntry): Observable<MealEntry> {
    return this.http.post<MealEntry>(`${this.apiUrl}`, meal);
  }

  getMealsByDate(date: string): Observable<MealEntry[]> {
    return this.http.get<MealEntry[]>(`http://localhost:8080/api/meals/date/${date}`);
  }
  
  getMealHistory(start?: string, end?: string): Observable<MealEntry[]> {
    let url = `${this.apiUrl}/history`;
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }
    return this.http.get<MealEntry[]>(url);
  }
  
  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  

}
