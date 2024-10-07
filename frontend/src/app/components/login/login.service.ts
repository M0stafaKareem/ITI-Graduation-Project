import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitiateRequestService } from '../../shared/services/initiate-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(
    private httpClient: InitiateRequestService,
    private spinner: NgxSpinnerService
  ) {
    const storedToken = sessionStorage.getItem('access_token');
    if (storedToken) {
      this.token = storedToken;
      this.loginStatus.next(true);
    } else {
      this.loginStatus.next(false);
    }
  }

  public get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  async verifyCredentials(email: string, password: string): Promise<any> {
    const api = 'http://localhost:8000/login';
    this.spinner.show();
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': this.httpClient.getXsrfToken!,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.access_token) {
        this.token = data.access_token;

        sessionStorage.setItem('access_token', this.token!);
        this.loginStatus.next(true);
        return true;
      } else {
        return data;
      }
    } catch (error) {
      this.spinner.hide();
      console.error('Error during login:', error);
      return {
        success: false,
        errors: {
          general: 'An error occurred during login. Please try again later.',
        },
      };
    }
  }

  verifyEmail(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('access_token');
    this.loginStatus.next(false);
  }
}
