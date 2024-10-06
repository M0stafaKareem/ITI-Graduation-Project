import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-from',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './register-from.component.html',
  styleUrls: [
    './register-from.component.css',
    'fonts/material-design-iconic-font/css/material-design-iconic-font.min.css',
  ],
})
export class RegisterFromComponent {
  errors: { [key: string]: string } = {};
  registrationForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  enteredFirstName = '';
  enteredLastName = '';
  enteredEmail = '';
  enteredPassword = '';
  enteredConfirmPassword = '';

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async onRegisterHandler() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
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
