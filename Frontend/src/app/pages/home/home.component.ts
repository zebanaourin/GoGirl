import { Component } from '@angular/core';
import { RoutineFormComponent } from '../routine-form/routine-form.component';
import { RoutineListComponent } from '../routine-list/routine-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RoutineFormComponent, RoutineListComponent],
  template: `
    <div class="page">
      <app-routine-form class="form"></app-routine-form>
      <app-routine-list class="list"></app-routine-list>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
