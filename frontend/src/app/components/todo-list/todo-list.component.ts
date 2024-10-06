import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './user/user.model';
import { LawyersService } from '../../shared/services/lawyers.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterOutlet, UserComponent, TasksComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  usersArray: User[] = [];
  selectedUser?: User;

  constructor(private lawyerService: LawyersService) {
    this.getLawyers();
  }

  getLawyers() {
    this.lawyerService.getLawyers().subscribe((data) =>
      data.map((user) =>
        this.usersArray.push({
          id: '' + user.id,
          name: user.name,
          avatar:
            user.avatar ||
            `assets/users/user-${Math.floor(Math.random() * 6) + 1}.jpg`,
        })
      )
    );
  }

  selectedUserHandler(selectedUser: User) {
    this.selectedUser = selectedUser;
  }
}
