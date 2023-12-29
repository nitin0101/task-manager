export interface TaskListResponse {
  tasks: Task[];
}

export interface Task {
  id: number; // You can include an identifier if your tasks have unique IDs
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdOn: string;
  updatedOn: string;
}
