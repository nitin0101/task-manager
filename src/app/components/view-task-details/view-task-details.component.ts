import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Task } from '../../models/model';
import * as TaskActions from '../../store/actions/task.actions';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.css',
})
export class ViewTaskDetailsComponent {
  taskId: number | undefined;
  task: Task | undefined;
  store$: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonServiceService,
    private store: Store<any>
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId = params['id'];
    });

    this.store$ = this.store.pipe(select('tasks'));
    this.store$.subscribe((resp: any) => {
      this.task = resp.tasks.find((el: any) => el.id == this.taskId);
    });
  }

  ngOnInit() {
    if (!this.task) {
      this.router.navigate(['/']);
    }
  }

  done() {
    this.router.navigate(['/']);
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
}
