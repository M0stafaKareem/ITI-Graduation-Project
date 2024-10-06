import { Injectable } from '@angular/core';
import { TodoListService } from '../../../shared/services/todo-list.service';
import { TodoItem } from '../../../shared/models/todo-item.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks!: TodoItem[];
  constructor(
    private todoService: TodoListService,
    private toastr: ToastrService
  ) {}

  get allTasks() {
    return this.tasks;
  }

  getAllTasks() {
    this.todoService.getTodos().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => this.toastr.error('Error retrieving tasks:', error.message)
    );
  }
  saveTask(task: TodoItem): void {
    this.tasks.push(task);
  }

  getUserTasks(userId: string): TodoItem[] {
    return this.tasks
      ? this.tasks.filter((task) => task.lawyer_id == userId)
      : [];
  }

  completeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.todoService.deleteTodo(taskId).subscribe(
      () => this.toastr.success('Task completed successfully'),
      (error) => this.toastr.error(error.message)
    );
  }

  addNewTask(task: TodoItem): void {
    this.todoService.insertTodo(task).subscribe(
      (response) => {
        this.getAllTasks();
        this.toastr.success('Task added successfully');
      },
      (error) => this.toastr.error('Error adding task:', error)
    );
  }

  updateTask(task: TodoItem): void {
    this.todoService.updateTodo(task.id, task).subscribe(
      (response: any) => this.toastr.success(response.message),
      (error) => this.toastr.error('Error updating task:', error)
    );
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, ...task } : t
    );
  }
}
