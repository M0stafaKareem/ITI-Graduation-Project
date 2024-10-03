import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { User } from '../user/user.model';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { TasksService } from './tasks.service';
import { TodoItem } from '../../../shared/models/todo-item.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) selectedUser!: User;
  isFormOpen = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getAllTasks();
  }

  get filteredTasks(): TodoItem[] {
    return this.tasksService.getUserTasks(this.selectedUser.id);
  }
  onCompleteHandler(taskId: string): void {
    this.tasksService.completeTask(taskId);
  }

  openForm(): void {
    this.isFormOpen = true;
  }
  closeForm(): void {
    this.isFormOpen = false;
  }
}
