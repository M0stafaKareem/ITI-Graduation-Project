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
  styleUrl: './login.component.css',
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
    this.loginService
      .verifyCredentials(this.enteredEmail, this.enteredPassword)
      .then((responce) => {
        if (responce) {
          this.toastr.success('Welcome', 'login Success', {
            positionClass: 'toast-bottom-right',
          });
          this.router.navigate(['/clients']);
          location.reload();
        } else {
          this.toastr.error('Invalid credentials', 'login failed', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }
}
