import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routine } from '../models/routine.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoutineService {

  private apiUrl = 'http://localhost:8080/api/routines';
  private routinesSubject = new BehaviorSubject<any[]>([]);
  routines$ = this.routinesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAll() : Observable<Routine[]>{
    return this.http.get<Routine[]>(this.apiUrl);
  }

  getByDate(date : string): Observable<Routine>{
    return this.http.get<Routine>(`${this.apiUrl}/${date}`);
  }

  create(routine:Routine):Observable<Routine>{
    return this.http.post<Routine>(this.apiUrl, routine);
  }

  update(date: string, routine : Routine): Observable<Routine>{
    return this.http.put<Routine>(`${this.apiUrl}/${date}`, routine);
  }

  delete(date:string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${date}`);
  }

  saveRoutine(routine: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, routine);
  }
  
  

  loadRoutines() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.routinesSubject.next(data);
    });
  }

  

}
