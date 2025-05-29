import { Routes } from '@angular/router';
import { RoutineListComponent } from './pages/routine-list/routine-list.component';
import { RoutineFormComponent } from './pages/routine-form/routine-form.component';
import { FoodComponent } from './pages/food/food.component';
import { HomeComponent } from './pages/home/home.component';
import { CalorieService } from './services/calorie-service.service';
import { CalorieTrackerComponent } from './pages/calorie-tracker/calorie-tracker.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'add', component: RoutineFormComponent },
    { path: 'edit/:date', component: RoutineFormComponent },
    {path: 'food', component : CalorieTrackerComponent}
];
