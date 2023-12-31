import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';
import { taskReducer } from './store/reducers/task.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AddEditTaskModalComponent } from './components/add-edit-task-modal/add-edit-task-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { MatChipsModule } from '@angular/material/chips';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchPipe } from './shared/pipe/search.pipe';
import {
  MatPaginatorModule,
} from '@angular/material/paginator';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddEditTaskModalComponent,
    ViewTaskDetailsComponent,
    DeleteConfirmationModalComponent,
    SpinnerComponent,
    TaskBoardComponent,
    DashboardComponent,
    SearchPipe,
    TabMenuComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatNativeDateModule,
    DragDropModule,
    AppRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }), // Configure the dev tool
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
