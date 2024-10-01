import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-from',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-from.component.html',
  styleUrls: [
    './login-from.component.css',
    'fonts/material-design-iconic-font/css/material-design-iconic-font.min.css',
  ],
})
export class LoginFromComponent {
  enteredEmail: string = '';
  enteredPassword: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  async onLoginHandler() {
    if (
      await this.loginService.verifyCredentials(
        this.enteredEmail,
        this.enteredPassword
      )
    ) {
      this.toastr.success('Welcome', 'login Success', {
        positionClass: 'toast-bottom-right',
      });
      console.log('Login successful');
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Invalid credentials', 'login failed', {
        positionClass: 'toast-bottom-right',
      });
      console.log('Invalid credentials');
    }
  }
}
