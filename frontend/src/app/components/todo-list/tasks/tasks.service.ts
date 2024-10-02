import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
    {
      id: 't4',
      userId: 'u5',
      title: 'Get Some rest',
      summary: 'Go Get Some Sleep and a cup of wine and brush your teeth',
      dueDate: '2024-06-15',
    },
  ];

  getAllTasks() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks')!);
    }
  }
  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  getUserTasks(userId: string): Task[] {
    this.getAllTasks();
    return this.tasks.filter((task) => task.userId === userId);
  }

  completeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  addNewTask(task: Task): void {
    this.tasks.unshift(task);
    this.saveTasks();
  }
}
