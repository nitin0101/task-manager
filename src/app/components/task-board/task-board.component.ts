import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';
import * as TaskActions from '../../store/actions/task.actions';
import { Task } from '../../models/model';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../services/common-service.service';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent {
  tasks: Task[] = [];
  board: any;

  taskStoreResponse$: Observable<Task[]>;
  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonServiceService
  ) {
    this.taskStoreResponse$ = this.store.pipe(select('tasks'));
    this.taskStoreResponse$.subscribe((resp: any) => {
      this.tasks = resp.tasks;
    });
  }
  ngOnInit() {
    if (!this.tasks.length) {
      this.router.navigate(['/']);
    }
    this.board = {
      name: 'my board',
      columns: [
        {
          name: 'open',
          color: 'accent',
          id: '101',
          tasks: this.tasks.filter((task) => task.status === 'open'),
        },
        {
          name: 'in-progress',
          id: '102',
          tasks: this.tasks.filter((task) => task.status === 'in-progress'),
        },
        {
          name: 'completed',
          id: '103',
          tasks: this.tasks.filter((task) => task.status === 'completed'),
        },
      ],
    };
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];

      const targetColumn = event.container.id;

      const columnStatusMap: { [key: string]: string } = {
        '101': 'open',
        '102': 'in-progress',
        '103': 'completed',
      };
      const targetStatus = columnStatusMap[targetColumn];

      this.onStatusChange(targetStatus, movedItem.id);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onStatusChange(status: any, taskId: number) {
    this.commonService.showSpinner();
    const taskStatus = status;
    this.commonService.updateTask({ status: taskStatus }, taskId).subscribe({
      next: (task) => {
        this.store.dispatch(TaskActions.updateTask({ task }));
        this.commonService.hideSpinner();
      },
      error: () => {
        this.commonService.hideSpinner();
      },
    });
  }
}
