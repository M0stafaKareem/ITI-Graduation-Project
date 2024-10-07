import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errors: { [key: string]: string } = {};
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
    console.log('hi');

    const userData = {
      name: `${this.enteredFirstName} ${this.enteredLastName}`,
      email: this.enteredEmail,
      password: this.enteredPassword,
      password_confirmation: this.enteredConfirmPassword,
    };
    this.errors = {};

    const result = await this.registerService.registerUser(userData);

    if (result.success) {
      this.router.navigate([{ outlets: { authentication: ['verify-email'] } }]);
    } else {
      this.errors = result.errors;
    }
  }
}
