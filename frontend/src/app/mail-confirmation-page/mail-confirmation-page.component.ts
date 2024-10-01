import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../login-from/login.service';

@Component({
  selector: 'app-mail-confirmation-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mail-confirmation-page.component.html',
  styleUrl: './mail-confirmation-page.component.css',
})
export class MailConfirmationPageComponent {
  queryParams: any = undefined;
  backendResponse: string = '';
  backEndStatusCode!: number;

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
      console.log(response);
    });

    return new Promise((resolve) => {
      this.loginService.verifyEmail(this.queryParams.url).subscribe({
        next: (response) => {
          this.backendResponse = response.message;
          this.backEndStatusCode = response.status;
          resolve(true);
        },
        error: (response) => {
          console.error('Error:', response);
          this.backendResponse = response.error.message;
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
}
