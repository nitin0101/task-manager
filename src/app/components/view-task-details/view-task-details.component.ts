import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Task } from '../../models/model';

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

  done(){
    this.router.navigate(['/']);
  }
}
