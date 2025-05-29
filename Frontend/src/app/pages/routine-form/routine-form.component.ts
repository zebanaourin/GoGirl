import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { Routine, Workout, WorkoutSet } from '../../models/routine.model';
import { RoutineService } from '../../services/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-routine-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-form.component.html',
  styleUrl: './routine-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoutineFormComponent implements OnInit{
  routine : Routine = {date: '', muscleGroup: '', workouts:[]};
  editMode = false;

  constructor(
    private routineService: RoutineService,
    private route : ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild('form') form!: NgForm;


  ngOnInit() {
    const date = this.route.snapshot.paramMap.get('date');
    if(date){
      this.editMode = true;
      this. routineService.getByDate(date).subscribe(r => this.routine = r);
    } 
  }

  addWorkout(){
    this.routine.workouts.push({name: '', sets: []});
  }

  removeWorkout(i:number){
    this.routine.workouts.splice(i, 1);
  }

  addSet(workout: any){
    if(!workout.sets){
      workout.sets = [];
    }
    workout.sets.push({reps:0, weight:0});
  }

  removeSet(workout:any, index: number){
    if(workout.sets && workout.length > index){
      workout.sets.splice(index, 1);
    }
  }

  removeEventListener(workout: Workout, i:number){
    workout.sets.splice(i,1);
  }

  save() {
    const newRoutine = {
      date: this.routine.date,
      muscleGroup: this.routine.muscleGroup,
      workouts: this.routine.workouts
    };
  
    this.routineService.saveRoutine(newRoutine).subscribe(() => {
      this.routineService.loadRoutines();
  
      // ✅ Reset the form and model
      this.form.resetForm();
      this.routine = {
        date: '',
        muscleGroup: '',
        workouts: []
      };
    });
  }
  
  

  saveRoutine() {
    const routine = {
      date: new Date().toISOString().split('T')[0],
      muscleGroup: this.routine.muscleGroup,
      workouts: this.routine.workouts
    };
  
    this.routineService.saveRoutine(routine);
    this.routineService.loadRoutines();  // <-- add this
    this.router.navigate(['/']);
  }
  


}



