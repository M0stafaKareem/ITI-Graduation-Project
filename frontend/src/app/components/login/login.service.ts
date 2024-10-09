import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitiateRequestService } from '../../shared/services/initiate-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  private otpStatus = new BehaviorSubject<boolean>(false);
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

  public get isOtpFormOpen() {
    return this.otpStatus.getValue();
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
      this.spinner.hide();

      if (data.message === 'OTP code sent') {
        this.otpStatus.next(true);
        return 'OTP code sent';
      } else {
        this.otpStatus.next(false);
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

  async verifyOtp(email: string, password: string, otp: string): Promise<any> {
    const api = 'http://127.0.0.1:8000/api/verify-otp';
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': this.httpClient.getXsrfToken!,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, otp }),
      });

      const data = await response.json();
      this.spinner.hide();

      if (data.access_token) {
        this.token = data.access_token;
        sessionStorage.setItem('access_token', this.token!);
        this.loginStatus.next(true);
        return 'welcome';
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

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('access_token');
    this.loginStatus.next(false);
  }
}
