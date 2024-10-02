import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task-form.component.html',
  styleUrl: './new-task-form.component.css',
})
export class NewTaskFormComponent {
  constructor(private tasksService: TasksService) {}

  @Input({ required: true }) userId!: string;
  @Output() cancel = new EventEmitter();

  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDate: string = '';

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      userId: this.userId,
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    };
    this.tasksService.addNewTask(newTask);
    this.cancel.emit();
  }
}
