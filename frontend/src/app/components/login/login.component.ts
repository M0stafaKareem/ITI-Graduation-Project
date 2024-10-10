import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, OtpVerificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  enteredEmail: string = '';
  enteredPassword: string = '';
  otpFormStatus = false;
  errors: { [key: string]: string } = {};

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  async onLoginHandler() {
    if (!this.enteredEmail || !this.enteredPassword) {
      this.toastr.error(
        'Email and Password are required',
        'Invalid credentials',
        {
          positionClass: 'toast-bottom-right',
        }
      );
      return;
    }
    this.loginService
      .verifyCredentials(this.enteredEmail, this.enteredPassword)
      .then((responce) => {
        if (responce === 'OTP code sent') {
          this.toastr.success(
            `OTP Sent to ${this.enteredEmail} `,
            'Verify OTP',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          this.otpFormStatus = true;
        } else {
          this.toastr.error('Invalid credentials', 'login failed', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }

  closeOtpForm() {
    this.otpFormStatus = false;
    this.errors = {};
  }
}
