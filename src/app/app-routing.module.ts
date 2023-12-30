import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { AddEditTaskModalComponent } from './components/add-edit-task-modal/add-edit-task-modal.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'view-task/:id', component: ViewTaskDetailsComponent },
  { path: 'board', component: TaskBoardComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
