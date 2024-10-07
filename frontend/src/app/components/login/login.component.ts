import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  enteredEmail: string = '';
  enteredPassword: string = '';
  errors: { [key: string]: string } = {};

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  async onLoginHandler() {
    const response = await this.loginService.verifyCredentials(
      this.enteredEmail,
      this.enteredPassword
    );

    if (response.success) {
      this.toastr.success('Welcome', 'Login Successful', {
        positionClass: 'toast-bottom-right',
      });
      this.router.navigate(['/dashboard']);
      location.reload();
    } else {
      this.errors = response.errors || {};
      this.toastr.error('Invalid credentials', 'Login Failed', {
        positionClass: 'toast-bottom-right',
      });
    }
  }
}
