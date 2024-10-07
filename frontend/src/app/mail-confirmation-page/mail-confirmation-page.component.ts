import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../components/login/login.service';

@Component({
  selector: 'app-mail-confirmation-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mail-confirmation-page.component.html',
  styleUrl: './mail-confirmation-page.component.css',
})
export class MailConfirmationPageComponent {
  queryParams: any = undefined;
  backendResponse: string = 'Please Verify Your Email Address';
  backEndStatusCode: number | null = null;

  constructor(
    private routerLink: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.verifyEmailAddress();
  }
  verifyEmailAddress() {
    this.routerLink.queryParams.subscribe((params) => {
      this.queryParams = params;
      const response = this.loginService.verifyEmail(this.queryParams.url);
    });

    return new Promise((resolve) => {
      this.loginService.verifyEmail(this.queryParams.url).subscribe({
        next: (response) => {
          this.backendResponse = response.message;
          this.backEndStatusCode = response.status;
          resolve(true);
        },
        error: (response) => {
          this.backendResponse = response.error ? response.error.message : '';
          this.backEndStatusCode = response.status;
          if (this.backEndStatusCode == 404) {
            this.backendResponse = 'Confirmation link is Expired';
          }
          resolve(false);
        },
      });
    });
  }

  redirectToRegister() {
    this.router.navigate([{ outlets: { authentication: ['register'] } }]);
  }
  redirectToLogin() {
    this.router.navigate(['']);
  }
  redirectToGmail() {
    location.href = 'https://mail.google.com';
  }
}
