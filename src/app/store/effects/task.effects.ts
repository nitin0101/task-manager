import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { CommonServiceService } from '../../services/common-service.service';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService
          .getTasks()
          .pipe(map((tasks) => TaskActions.loadTasksSuccess(tasks)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: CommonServiceService
  ) {}
}
