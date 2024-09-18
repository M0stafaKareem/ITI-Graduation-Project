import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register-from',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-from.component.html',
  styleUrls: [
    './register-from.component.css',
    'fonts/material-design-iconic-font/css/material-design-iconic-font.min.css',
  ],
})
export class RegisterFromComponent {
  constructor(private registerService: RegisterService) {}

  enteredFirstName = '';
  enteredLastName = '';
  enteredEmail = '';
  enteredPassword = '';
  enteredConfirmPassword = '';

  async onRegisterHandler() {
    const userData = {
      name: `${this.enteredFirstName} ${this.enteredLastName}`,
      email: this.enteredEmail,
      password: this.enteredPassword,
      password_confirmation: this.enteredConfirmPassword,
    };
    if (await this.registerService.registerUser(userData))
      console.log('registration successful');
    else console.log('registration failed, Enter a Valid Data');
  }
}
