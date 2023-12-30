import { Component } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import { Task } from '../../models/model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from '../../store/actions/task.actions';
import { Router } from '@angular/router';
import { AddEditTaskModalComponent } from '../add-edit-task-modal/add-edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'dueDate',
    'priority',
    'status',
    'actions',
  ];

  tasks2$: Observable<Task[]>;
  constructor(
    private commonService: CommonServiceService,
    private store: Store<any>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.tasks2$ = this.store.pipe(select('tasks'));
    this.tasks2$.subscribe((resp: any) => {
      console.log('task list store>>', resp);
      this.tasks = resp.tasks;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(TaskActions.loadTasks());
      this.commonService.hideSpinner();
    }, 0);
  }

  onStatusChange(event: any, taskId: number) {
    const taskStatus = event.target.value as string;
    this.store.dispatch(TaskActions.changeStatus({ taskStatus, taskId }));
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddEditTaskModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(({ task }) => {
      this.addTask(task);
    });
  }

  editTaskDialog(id: any): void {
    const taskToEdit = this.tasks.find((el) => el.id === id);
    const dialogRef = this.dialog.open(AddEditTaskModalComponent, {
      data: { ...taskToEdit, header: 'Update Task' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(({ task }) => {
      console.log('updated task', task);
      this.updateTask(task);
    });
  }

  viewTask(id: any) {
    this.router.navigate(['./view-task/' + id]);
  }

  addTask(taskData: Task): void {
    this.commonService.showSpinner();
    const task = {
      ...taskData,
      id: this.tasks.length + 1,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      status: 'open',
    };

    setTimeout(() => {
      this.store.dispatch(TaskActions.addTask({ task }));
      this.commonService.hideSpinner();
    }, 1000);
  }

  updateTask(taskData: Task): void {
    this.commonService.showSpinner();
    const task = {
      ...taskData,
      updatedOn: new Date().toISOString(),
    };
    setTimeout(() => {
      this.store.dispatch(TaskActions.updateTask({ task }));
      this.commonService.hideSpinner();
    }, 1000);
  }

  deleteTask(taskId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'delete') {
        this.commonService.showSpinner();
        this.commonService.deleteTask(taskId).subscribe({
          next: () => {
            this.store.dispatch(TaskActions.deleteTask({ taskId }));
            this.commonService.hideSpinner();
          },
        });
      }
    });
  }
}
