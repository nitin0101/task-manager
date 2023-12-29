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
  private apiUrl = 'assets/mock-response/task-list-response.json';
  spinnerSubject$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store<any>) {}

  getTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(this.apiUrl);
  }

  addTask(task: Task): void {
    this.store.dispatch(TaskActions.addTask({ task }));
  }
  deleteTask(taskId: number): void {
    //call delete API
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
  }

  showSpinner() {
    this.spinnerSubject$.next(true);
  }

  hideSpinner() {
    this.spinnerSubject$.next(false);
  }
}
