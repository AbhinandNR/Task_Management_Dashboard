import { Task, AuthState, TaskFilters } from "./types";

const STORAGE_KEYS = {
  TASKS: "task-management-tasks",
  AUTH: "task-management-auth",
  FILTERS: "task-management-filters",
} as const;

export const storage = {
  // Tasks
  getTasks(): Task[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },

  saveTasks(tasks: Task[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  },

  updateTask(taskId: string, updates: Partial<Task>): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      this.saveTasks(tasks);
    }
  },

  deleteTask(taskId: string): void {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(filteredTasks);
  },

  // Authentication
  getAuth(): AuthState {
    if (typeof window === "undefined") return { isLoggedIn: false };
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data ? JSON.parse(data) : { isLoggedIn: false };
  },

  setAuth(auth: AuthState): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  },

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // Filters
  getFilters(): TaskFilters {
    if (typeof window === "undefined") {
      return { status: "all", search: "", sortBy: "dueDate", sortOrder: "asc" };
    }
    const data = localStorage.getItem(STORAGE_KEYS.FILTERS);
    return data ? JSON.parse(data) : { status: "all", search: "", sortBy: "dueDate", sortOrder: "asc" };
  },

  setFilters(filters: TaskFilters): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  },
};
