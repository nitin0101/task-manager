import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/actions/task.actions';
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent {
  constructor(private store: Store<any>) {}
  board = {
    name: 'my board',
    columns: [
      {
        name: 'open',
        id: '101',
        tasks: [
          {
            id: 2,
            title: 'Write Blog Post',
            description: 'Create a blog post on Angular best practices.',
            priority: 'Medium',
            status: 'open',
            dueDate: '2023-12-15',
            createdOn: '2023-12-02T09:45:00Z',
            updatedOn: '2023-12-02T12:15:00Z',
          },
          {
            id: 4,
            title: 'Plan Project Scope',
            description: 'Define the scope and goals for the upcoming project.',
            priority: 'Low',
            status: 'open',
            dueDate: '2023-12-10',
            createdOn: '2023-12-05T14:30:00Z',
            updatedOn: '2023-12-05T16:00:00Z',
          },
          {
            id: 5,
            title: 'Create Wireframes',
            description: 'Design wireframes for the user interface.',
            priority: 'High',
            status: 'open',
            dueDate: '2023-12-18',
            createdOn: '2023-12-07T10:00:00Z',
            updatedOn: '2023-12-07T12:45:00Z',
          },
        ],
      },
      {
        name: 'in-progress',
        id: '102',
        tasks: [
          {
            id: 3,
            title: 'Implement Drag-and-Drop',
            description: 'Add a drag-and-drop interface for task reordering.',
            priority: 'High',
            status: 'in-progress',
            dueDate: '2023-12-20',
            createdOn: '2023-12-03T11:20:00Z',
            updatedOn: '2023-12-03T16:45:00Z',
          },
          {
            id: 6,
            title: 'Code Refactoring',
            description: 'Refactor existing code for better maintainability.',
            priority: 'Medium',
            status: 'in-progress',
            dueDate: '2023-12-22',
            createdOn: '2023-12-10T09:00:00Z',
            updatedOn: '2023-12-10T14:30:00Z',
          },
          {
            id: 7,
            title: 'Testing Automation',
            description: 'Implement automated testing for the application.',
            priority: 'High',
            status: 'in-progress',
            dueDate: '2023-12-25',
            createdOn: '2023-12-15T13:15:00Z',
            updatedOn: '2023-12-15T16:30:00Z',
          },
        ],
      },
      {
        name: 'completed',
        id: '103',
        tasks: [
          {
            id: 14,
            title: 'Optimize Database Queries',
            description: 'Fine-tune database queries for improved performance.',
            priority: 'Medium',
            status: 'completed',
            dueDate: '2023-12-16',
            createdOn: '2023-12-14T10:20:00Z',
            updatedOn: '2023-12-14T15:00:00Z',
          },
          {
            id: 15,
            title: 'User Interface Polish',
            description:
              'Polish the user interface for a better user experience.',
            priority: 'Low',
            status: 'completed',
            dueDate: '2023-12-28',
            createdOn: '2023-12-20T08:45:00Z',
            updatedOn: '2023-12-20T12:00:00Z',
          },
          {
            id: 16,
            title: 'Generate Reports',
            description: 'Implement functionality to generate reports.',
            priority: 'High',
            status: 'completed',
            dueDate: '2023-12-30',
            createdOn: '2023-12-25T09:30:00Z',
            updatedOn: '2023-12-25T14:15:00Z',
          },
          {
            id: 17,
            title: 'Documentation Update',
            description: 'Update project documentation for the latest changes.',
            priority: 'Low',
            status: 'completed',
            dueDate: '2024-01-05',
            createdOn: '2023-12-28T11:00:00Z',
            updatedOn: '2023-12-28T14:45:00Z',
          },
        ],
      },
    ],
  };

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      const sourceColumn = event.previousContainer.id;
      const targetColumn = event.container.id;

      // Map column IDs to corresponding statuses
      const columnStatusMap: { [key: string]: string } = {
        '101': 'open',
        '102': 'in-progress',
        '103': 'completed',
        // Add more mappings as needed
      };

      // Get the status for the target column
      const targetStatus = columnStatusMap[targetColumn];

      // Update the status of the moved item
      movedItem.status = targetStatus;

      this.onStatusChange(targetStatus, movedItem.id);

      // Perform additional actions with the moved item and column information
      console.log('Moved Item:', movedItem);
      console.log('Source Column:', sourceColumn);
      console.log('Target Column:', targetColumn);
      console.log('Target Status:', targetStatus);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onStatusChange(status: any, taskId: number) {
    const taskStatus = status;
    this.store.dispatch(TaskActions.changeStatus({ taskStatus, taskId }));
  }
}
