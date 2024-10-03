import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TodoItem } from '../../../../shared/models/todo-item.model';

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
  enteredDate = new Date();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    const newTask: TodoItem = {
      id: Math.random().toString(36).substring(2, 9),
      user_id: this.userId,
      title: this.enteredTitle,
      description: this.enteredSummary,
      is_completed: false,
      due_date: this.enteredDate,
    };
    this.tasksService.addNewTask(newTask);
    this.cancel.emit();
  }
}
