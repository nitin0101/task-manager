import * as TaskActions from '../actions/task.actions';
import { Task } from '../../models/model';
import { taskReducer, initialState } from './task.reducers';

describe('Task Reducer', () => {
  it('should handle loadTasksSuccess action', () => {
    const tasks = [
      { id: 1, name: 'Task 1' },
      { id: '2', name: 'Task 2' },
    ] as any;

    const action = TaskActions.loadTasksSuccess({ tasks });
    const result = taskReducer(initialState, action);
    expect(result).toEqual({
      tasks: [
        { id: 1, name: 'Task 1' },
        { id: '2', name: 'Task 2' },
      ],
    } as any);
  });

  it('should handle addTask action', () => {
    const task = { id: 3, name: 'Task 3' } as any;

    const action = TaskActions.addTask({ task });
    const result = taskReducer(initialState, action);
    expect(result).toEqual({
      tasks: [{ id: 3, name: 'Task 3' }],
    } as any);
  });

  it('should handle updateTask action', () => {
    const task = { id: 1, name: 'new task' } as any;

    const state = {
      tasks: [
        { id: 1, name: 'new task1' },
        { id: 2, name: 'Task 2' },
      ],
    };
    const action = TaskActions.updateTask({ task });
    const result = taskReducer(state as any, action);
    expect(result).toEqual({
      tasks: [
        { id: 1, name: 'new task' },
        { id: 2, name: 'Task 2' },
      ],
    } as any);
  });

  it('should handle deleteTask action', () => {
    const taskId = 1;
    const state = {
      tasks: [
        { id: 1, name: 'new task1' },
        { id: 2, name: 'Task 2' },
      ],
    };
    const action = TaskActions.deleteTask({ taskId });
    const result = taskReducer(state as any, action);
    expect(result).toEqual({
      tasks: [{ id: 2, name: 'Task 2' }],
    } as any);
  });
});
