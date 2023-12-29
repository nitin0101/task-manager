import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { AddEditTaskModalComponent } from './components/add-edit-task-modal/add-edit-task-modal.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'view-task/:id', component: ViewTaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
