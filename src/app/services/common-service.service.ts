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

  addTask(task: Task): void {
    this.store.dispatch(TaskActions.addTask({ task }));
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
