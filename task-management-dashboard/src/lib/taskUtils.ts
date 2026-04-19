import { Task, TaskFilters } from "./types";

export const filterAndSortTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  let filteredTasks = [...tasks];

  // Filter by status
  if (filters.status !== "all") {
    filteredTasks = filteredTasks.filter((task) => task.status === filters.status);
  }

  // Filter by search (case insensitive title search)
  if (filters.search.trim()) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Sort tasks
  filteredTasks.sort((a, b) => {
    let aValue: string | Date;
    let bValue: string | Date;

    if (filters.sortBy === "dueDate") {
      aValue = new Date(a.dueDate);
      bValue = new Date(b.dueDate);
    } else {
      aValue = a.title.toLowerCase();
      bValue = b.title.toLowerCase();
    }

    if (filters.sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filteredTasks;
};

export const generateTaskId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
