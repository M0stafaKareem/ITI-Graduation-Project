import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import { TodoItem } from '../../../../shared/models/todo-item.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(private tasksService: TasksService) {}

  @Input({ required: true }) task!: TodoItem;

  onCompleteTask() {
    this.task.is_completed = true;
    this.tasksService.updateTask(this.task);
    this.tasksService.completeTask(this.task.id);
  }
}
