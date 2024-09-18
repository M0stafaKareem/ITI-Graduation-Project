import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginStatus: boolean = false;
  private token: string | null = null;

  public get isLoggedIn(): boolean {
    return (
      this.loginStatus && this.token === sessionStorage.getItem('access_token')!
    );
  }

  async verifyCredentials(email: string, password: string) {
    const api = 'http://localhost:8000/api/login';

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      this.loginStatus = true;
      this.token = jsonResponse.access_token;
      sessionStorage.setItem('access_token', JSON.stringify(this.token));
      return true;
    }

    this.loginStatus = false;
    return false;
  }

  async logout() {
    this.token = null;
    sessionStorage.removeItem('access_token');
    this.loginStatus = false;

    // const api = 'http://localhost:8000/api/logout';
    // await fetch(api, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }

  constructor() {}
}
