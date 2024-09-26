import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor() {
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

  async verifyCredentials(email: string, password: string): Promise<boolean> {
    const api = 'http://localhost:8000/api/login';

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        this.token = jsonResponse.access_token;

        sessionStorage.setItem('access_token', this.token!);
        this.loginStatus.next(true);

        return true;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    this.loginStatus.next(false);
    return false;
  }

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('access_token');
    this.loginStatus.next(false);
  }
}
