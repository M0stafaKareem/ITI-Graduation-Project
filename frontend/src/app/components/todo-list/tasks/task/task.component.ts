import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { CardComponent } from '../../../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(private tasksService: TasksService) {}

  @Input({ required: true }) task!: Task;

  onCompleteTask() {
    this.tasksService.completeTask(this.task.id);
  }
}
