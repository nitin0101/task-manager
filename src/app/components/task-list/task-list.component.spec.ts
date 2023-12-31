import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../../app.module';
import { Observable, of, throwError } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [MatDialogModule, HttpClientModule, AppModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculateSerialNumber method should return sr no', () => {
    component.pageSize = 1;
    component.pageIndex = 2;
    const expected = component.calculateSerialNumber(5);
    expect(expected).toEqual(8);
  });

  it('openAddTaskDialog method should open dialoag', () => {
    const mockResp = {
      afterClosed: () => {
        return of({});
      },
    } as any;
    spyOn(component, 'addTask');
    spyOn(component['dialog'], 'open').and.returnValue(mockResp);
    component.openAddTaskDialog();
    expect(component.addTask).toHaveBeenCalled();
  });

  it('editTaskDialog method should open dialoag', () => {
    component.tasks = [
      {
        title:
          'Sanitize and validate user inputs to prevent potential security issues.',
        description: '',
        priority: 'low',
        dueDate: '2024-03-29',
        id: 123101,
        createdOn: '2023-12-30T17:42:37.025Z',
        updatedOn: '2023-12-31T05:25:35.980Z',
        status: 'completed',
      },
    ];
    const mockResp = {
      afterClosed: () => {
        return of({});
      },
    } as any;
    spyOn(component, 'updateTask');
    spyOn(component['dialog'], 'open').and.returnValue(mockResp);
    component.editTaskDialog(1234);
    expect(component.updateTask).toHaveBeenCalled();
  });

  it('onStatusChange method should update the status', () => {
    const mockResp = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 123101,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    spyOn(component['commonService'], 'updateTask').and.callFake(() => {
      return of(mockResp);
    });
    const event = { target: { value: 'open' } };
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.onStatusChange(event, 101);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('onStatusChange method should update the status - API Failure', () => {
    const event = { target: { value: 'open' } };
    spyOn(component['commonService'], 'updateTask').and.returnValue(
      throwError(() => new Error(''))
    );
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.onStatusChange(event, 101);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('getColour method should return color', () => {
    spyOn(component['commonService'], 'getColour').and.returnValue('green');
    const expected = component.getColour('low');
    expect(expected).toEqual('green');
  });

  it('getCalendarColour method should return color', () => {
    spyOn(component['commonService'], 'getCalendarColour').and.returnValue(
      'green'
    );
    const expected = component.getCalendarColour('2022-12-01');
    expect(expected).toEqual('green');
  });

  it('viewTask method should naviagte view details page', () => {
    spyOn(component['router'], 'navigate');
    component.viewTask(1234);
    expect(component['router'].navigate).toHaveBeenCalledWith([
      './view-task/1234',
    ]);
  });

  it('addTask method should add the task', () => {
    const task = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 123101,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    spyOn(component['commonService'], 'addTask').and.callFake(() => {
      return of({});
    });
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.addTask(task);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('addTask method should add the task - API Failure', () => {
    const task = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 123101,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    spyOn(component['commonService'], 'addTask').and.returnValue(
      throwError(() => new Error(''))
    );
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.addTask(task);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('updateTask method should update the task', () => {
    const task = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 123101,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    spyOn(component['commonService'], 'updateTask').and.callFake(() => {
      return of({});
    });
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.updateTask(task);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('updateTask method should update the task - API Failure', () => {
    const task = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 123101,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    spyOn(component['commonService'], 'updateTask').and.returnValue(
      throwError(() => new Error(''))
    );
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.updateTask(task);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('deleteTask method should open confirmationa dialog and delete the task', () => {
    spyOn(component['commonService'], 'deleteTask').and.callFake(() => {
      return of({});
    });
    const mockResp = {
      afterClosed: () => {
        return of('delete');
      },
    } as any;
    spyOn(component['dialog'], 'open').and.returnValue(mockResp);

    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.deleteTask(1234);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('deleteTask method should open confirmationa dialog and delete the task - api failure', () => {
    spyOn(component['commonService'], 'deleteTask').and.returnValue(
      throwError(() => new Error(''))
    );
    const mockResp = {
      afterClosed: () => {
        return of('delete');
      },
    } as any;
    spyOn(component['dialog'], 'open').and.returnValue(mockResp);

    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.deleteTask(1234);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('ngAfterViewInit method set page index for paginator', () => {
    component.paginator = {
      page: of({}),
    } as any;
    component.ngAfterViewInit();
  });

  it('should sort tasks by priority', () => {
    const initialTasks = [
      { priority: 'Medium', description: 'Task 2' },
      { priority: 'High', description: 'Task 1' },
    ] as any;
    component.tasks = [...initialTasks];
    component.sortData('priority');
    const expectedTasks = [
      { priority: 'High', description: 'Task 1' },
      { priority: 'Medium', description: 'Task 2' },
    ] as any;
    expect(component.tasks).toEqual(expectedTasks);
  });

  it('should sort tasks by dueDate', () => {
    const initialTasks = [
      { dueDate: '2023-01-01', description: 'Task 1' },
      { dueDate: '2023-02-01', description: 'Task 2' },
    ] as any;
    component.tasks = [...initialTasks];
    component.sortData('dueDate');
    const expectedTasks = [
      { dueDate: '2023-01-01', description: 'Task 1' },
      { dueDate: '2023-02-01', description: 'Task 2' },
    ] as any;
    expect(component.tasks).toEqual(expectedTasks);
  });
});
