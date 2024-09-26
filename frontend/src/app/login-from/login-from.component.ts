import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private loginService: LoginService) {}
  async onLoginHandler() {
    if (
      await this.loginService.verifyCredentials(
        this.enteredEmail,
        this.enteredPassword
      )
    ) {
      console.log('Login successful');
      location.href = '/dashboard';
    } else {
      console.log('Invalid credentials');
    }
  }
}
