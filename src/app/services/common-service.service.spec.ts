import { TestBed } from '@angular/core/testing';

import { CommonServiceService } from './common-service.service';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';

describe('CommonServiceService', () => {
  let service: CommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideMockStore({})],
    });
    service = TestBed.inject(CommonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTasks method should call get all tasks api', () => {
    const spy = spyOn(service['http'], 'get');
    service.getTasks();
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/tasks');
  });

  it('addTask method should call add api', () => {
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
    const spy = spyOn(service['http'], 'post');
    service.addTask(task);
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/tasks', task);
  });

  it('updateTask method shouldcall patch task api', () => {
    const task = {
      title:
        'Sanitize and validate user inputs to prevent potential security issues.',
      description: '',
      priority: 'low',
      dueDate: '2024-03-29',
      id: 1234,
      createdOn: '2023-12-30T17:42:37.025Z',
      updatedOn: '2023-12-31T05:25:35.980Z',
      status: 'completed',
    };
    const spy = spyOn(service['http'], 'patch');
    service.updateTask(task, 1234);
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/tasks/1234', task);
  });

  it('deleteTask method should call delete task api', () => {
    const spy = spyOn(service['http'], 'delete');
    service.deleteTask(1234);
    expect(spy).toHaveBeenCalledWith('http://localhost:3000/tasks/1234');
  });

  it('getColour method should return green colour - low priority', () => {
    const expected = service.getColour('low');
    expect(expected).toEqual('green');
  });

  it('getColour method should return orange colour - medium priority', () => {
    const expected = service.getColour('medium');
    expect(expected).toEqual('orange');
  });

  it('getColour method should return red colour - high priority', () => {
    const expected = service.getColour('high');
    expect(expected).toEqual('red');
  });

  it('getColour method should return grey colour -default', () => {
    const expected = service.getColour('');
    expect(expected).toEqual('grey');
  });

  it('should return "red" colour for overdue due date', () => {
    const dueDate = '2022-01-01';
    const result = service.getCalendarColour(dueDate);
    expect(result).toBe('red');
  });

  it('should return "orange" colour for upcoming due date within 4 days', () => {
    const currentDate = new Date();
    const upcomingDueDate = new Date(
      currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    const result = service.getCalendarColour(upcomingDueDate.toISOString());
    expect(result).toBe('orange');
  });

  it('should return "green" colour for default due date more than 4 days away', () => {
    const currentDate = new Date();
    const defaultDueDate = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const result = service.getCalendarColour(defaultDueDate.toISOString());
    expect(result).toBe('green');
  });
});
