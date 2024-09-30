import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

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
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

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
      this.router.navigate([{ outlets: { authentication: ['verify-email'] } }]);
    else console.log('registration failed, Enter a Valid Data');
  }
}
