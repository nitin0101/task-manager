import { Component, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import { Task } from '../../models/model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from '../../store/actions/task.actions';
import { Router } from '@angular/router';
import { AddEditTaskModalComponent } from '../add-edit-task-modal/add-edit-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  selectedSortOption: string | undefined;
  displayedColumns: string[] = [
    'counter',
    'id',
    'title',
    'dueDate',
    'priority',
    'status',
    'actions',
  ];

  searchText = '';
  pageSize = 10; // Set the number of tasks per page
  pageIndex = 0;
  taskStoreResponse$: Observable<Task[]>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(
    private commonService: CommonServiceService,
    private store: Store<any>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.taskStoreResponse$ = this.store.pipe(select('tasks'));
    this.taskStoreResponse$.subscribe((resp: any) => {
      this.tasks = [...resp.tasks];
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(TaskActions.loadTasks());
      this.commonService.hideSpinner();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
    });
  }

  calculateSerialNumber(indexOnPage: number): number {
    return this.pageIndex * this.pageSize + indexOnPage + 1;
  }

  sortData(sortOption: string): void {
    this.selectedSortOption = sortOption;
    if (sortOption == 'priority') {
      this.tasks = [
        ...this.tasks.sort((a, b) => a.priority.localeCompare(b.priority)),
      ];
    } else if (sortOption == 'dueDate') {
      this.tasks = this.tasks.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }
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
      id: 123100 + this.tasks.length + 1,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      status: 'open',
    };

    this.commonService.addTask(task).subscribe({
      next: () => {
        this.store.dispatch(TaskActions.addTask({ task }));
        this.commonService.hideSpinner();
      },
      error: () => {
        this.commonService.hideSpinner();
      },
    });
  }

  updateTask(taskData: Task): void {
    this.commonService.showSpinner();
    const task = {
      ...taskData,
      updatedOn: new Date().toISOString(),
    };

    this.commonService.updateTask(task, task.id).subscribe({
      next: () => {
        this.store.dispatch(TaskActions.updateTask({ task }));
        this.commonService.hideSpinner();
      },
      error: () => {
        this.commonService.hideSpinner();
      },
    });
  }

  onStatusChange(event: any, taskId: number) {
    this.commonService.showSpinner();
    const taskStatus = event.target.value as string;
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
          error: () => {
            this.commonService.hideSpinner();
          },
        });
      }
    });
  }
}
