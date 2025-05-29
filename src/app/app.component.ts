import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutineFormComponent } from "./pages/routine-form/routine-form.component";
import { RoutineListComponent } from "./pages/routine-list/routine-list.component";
import { NavBarComponent } from "./pages/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoutineFormComponent, RoutineListComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workout-tracker-frontend';
}
