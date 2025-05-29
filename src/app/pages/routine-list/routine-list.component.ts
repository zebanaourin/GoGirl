import { Component,OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { Routine } from '../../models/routine.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.css'
})

export class RoutineListComponent implements OnInit {

  routines: Routine[] = [];
  expandedMuscles: { [key: string]: boolean } = {}; 
  expandedExercises: { [key: string]: boolean } = {};

  constructor(private routineService: RoutineService, private router: Router){}

  ngOnInit(){
    this.routineService.routines$.subscribe(data => {
      this.routines = data;
    });

    this.routineService.loadRoutines(); 
  }

  toggleMuscleGroup(key: string) {
    this.expandedMuscles[key] = !this.expandedMuscles[key];
  }

  toggleExercise(key: string) {
    this.expandedExercises[key] = !this.expandedExercises[key];
  }

  loadRoutines(){
    this.routineService.getAll().subscribe(data=> this.routines = data);
  }

  deleteRoutine(date: string | Date) {
  const formattedDate = new Date(date).toISOString().split('T')[0]; // e.g., '2024-05-25'
  this.routineService.delete(formattedDate).subscribe(() => {
    this.loadRoutines();
  });
  }

  editRoutine(date:string){
    this.router.navigate(['/edit', date]);
  }

}
