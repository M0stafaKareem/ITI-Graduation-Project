import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
