import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskListResponse } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as TaskActions from '../store/actions/task.actions';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private basApiUrl = 'http://localhost:3000';
  spinnerSubject$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store<any>) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.basApiUrl + '/tasks');
  }

  addTask(task: Task): Observable<any> {
    return this.http.post<Task>(this.basApiUrl + '/tasks', task);
  }

  updateTask(task: any, taskId: any): Observable<any> {
    return this.http.patch<Task[]>(this.basApiUrl + '/tasks/' + taskId, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<Task[]>(this.basApiUrl + '/tasks/' + taskId);
  }

  showSpinner() {
    this.spinnerSubject$.next(true);
  }

  hideSpinner() {
    this.spinnerSubject$.next(false);
  }
}
