export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  email?: string;
}

export interface TaskFilters {
  status: TaskStatus | "all";
  search: string;
  sortBy: "dueDate" | "title";
  sortOrder: "asc" | "desc";
}
