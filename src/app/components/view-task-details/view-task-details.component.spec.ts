import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetailsComponent } from './view-task-details.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from '../../app.module';
import { of, throwError } from 'rxjs';

describe('ViewTaskDetailsComponent', () => {
  let component: ViewTaskDetailsComponent;
  let fixture: ComponentFixture<ViewTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskDetailsComponent],
      imports: [MatDialogModule, AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('done method should naviagte to listing page', () => {
    spyOn(component['router'], 'navigate');
    component.done();
    expect(component['router'].navigate).toHaveBeenCalledWith([
      '/',
    ]);
  });
});
