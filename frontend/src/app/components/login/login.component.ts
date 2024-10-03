import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
