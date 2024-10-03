import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selectedUser?: User;

  @Output() select = new EventEmitter<User>();

  get userImage() {
    return `${this.user.avatar}`;
  }

  get isSelected() {
    return this.selectedUser?.id === this.user.id;
  }

  onUserSelected() {
    this.select.emit(this.user);
  }
}
