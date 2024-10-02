import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './user/user.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterOutlet, UserComponent, TasksComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  usersArray = DUMMY_USERS;
  selectedUser?: User;

  selectedUserHandler(selectedUser: User) {
    this.selectedUser = selectedUser;
  }
}
