import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login-from/login.service';

@Component({
  selector: 'app-mail-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './mail-confirmation-page.component.html',
  styleUrl: './mail-confirmation-page.component.css',
})
export class MailConfirmationPageComponent {
  queryParams: any;
  constructor(
    private router: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.verifyEmailAddress();
  }
  verifyEmailAddress() {
    this.router.queryParams.subscribe((params) => {
      this.queryParams = params;
      const response = this.loginService.verifyEmail(this.queryParams.url);
      console.log(response);
    });
    return new Promise((resolve) => {
      this.loginService.verifyEmail(this.queryParams.url).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(false);
        },
      });
    });
  }
  isLoading: boolean = false;
  backendResponse: string = '';
}
