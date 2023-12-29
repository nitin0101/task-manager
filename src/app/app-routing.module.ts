import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'view-task/:id', component: ViewTaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
