import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
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
    // if (await this.registerService.registerUser(userData))
    //   this.router.navigate([{ outlets: { authentication: ['verify-email'] } }]);
    // else console.log('registration failed, Enter a Valid Data');

    this.registerService.registerUser(userData).then((responce: any) => {
      console.log(responce);

      if (responce.message) {
        this.toastr.success('One More Step', 'Please Verify Your E-mail', {
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate([
          { outlets: { authentication: ['verify-email'] } },
        ]);
      } else {
        this.showErrors(responce.errors);
      }
    });
  }
  showErrors(errors: any) {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const messages = errors[field];
        messages.forEach((message: string) => {
          this.toastr.error(
            message,
            field.charAt(0).toUpperCase() + field.slice(1)
          );
        });
      }
    }
  }
}
