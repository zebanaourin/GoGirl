export interface WorkoutSet{
    id?: number;
    reps: number;
    weights: number; 
}

export interface Workout{
    id?: number;
    name:string;
    sets:WorkoutSet[];
}

export interface Routine{
    id? : number;
    date : string;
    muscleGroup: string;
    workouts: Workout[];
}

