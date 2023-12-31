import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppModule } from '../../app.module';
import { of, throwError } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      imports: [MatDialogModule, HttpClientModule, AppModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the board', () => {
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

    component.ngOnInit()
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
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.onStatusChange('open', 101);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('onStatusChange method should update the status - API Failure', () => {
    spyOn(component['commonService'], 'updateTask').and.returnValue(
      throwError(() => new Error(''))
    );
    const hideSPy = spyOn(component['commonService'], 'hideSpinner');
    component.onStatusChange('open', 101);
    expect(hideSPy).toHaveBeenCalled();
  });

  it('drop method should move content to other column', () => {
    const data = ['Item 1', 'Item 2', 'Item 3'];
    const event = {
      previousContainer: { data },
      container: { data },
      previousIndex: 0,
      currentIndex: 2,
    } as CdkDragDrop<any[]>;

    spyOn(component, 'onStatusChange');
    component.drop(event);
    expect(component.onStatusChange).toHaveBeenCalled();
  });

  it('drop method should move content to other column', () => {
    const data = ['Item 1', 'Item 2', 'Item 3'];
    const event = {
      previousContainer: { data },
      container: { data },
      previousIndex: 0,
      currentIndex: 2,
    } as CdkDragDrop<any[]>;

    event.previousContainer = event.container;
    spyOn(component, 'onStatusChange');
    component.drop(event);
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
});
