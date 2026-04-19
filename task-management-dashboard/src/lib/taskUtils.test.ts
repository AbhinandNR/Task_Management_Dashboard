import { describe, it, expect } from 'vitest';
import { filterAndSortTasks } from './taskUtils';
import { Task, TaskFilters } from './types';

describe('taskUtils', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task B', description: 'Desc B', status: 'todo', dueDate: '2024-05-01' },
    { id: '2', title: 'Task A', description: 'Desc A', status: 'completed', dueDate: '2024-04-01' },
    { id: '3', title: 'Task C', description: 'Desc C', status: 'in-progress', dueDate: '2024-06-01' },
  ];

  it('filters by status', () => {
    const filters: TaskFilters = { status: 'todo', search: '', sortBy: 'title', sortOrder: 'asc' };
    const result = filterAndSortTasks(mockTasks, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('searches by title', () => {
    const filters: TaskFilters = { status: 'all', search: 'Task A', sortBy: 'title', sortOrder: 'asc' };
    const result = filterAndSortTasks(mockTasks, filters);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Task A');
  });

  it('sorts by title asc', () => {
    const filters: TaskFilters = { status: 'all', search: '', sortBy: 'title', sortOrder: 'asc' };
    const result = filterAndSortTasks(mockTasks, filters);
    expect(result[0].title).toBe('Task A');
    expect(result[1].title).toBe('Task B');
    expect(result[2].title).toBe('Task C');
  });

  it('sorts by dueDate desc', () => {
    const filters: TaskFilters = { status: 'all', search: '', sortBy: 'dueDate', sortOrder: 'desc' };
    const result = filterAndSortTasks(mockTasks, filters);
    expect(result[0].dueDate).toBe('2024-06-01');
    expect(result[1].dueDate).toBe('2024-05-01');
    expect(result[2].dueDate).toBe('2024-04-01');
  });
});
