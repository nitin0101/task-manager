export interface TaskListResponse {
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdOn: string;
  updatedOn: string;
}
