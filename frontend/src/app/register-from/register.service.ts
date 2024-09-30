import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    const api = 'http://localhost:8000/register';

    const token = await fetch( 'http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    });

    const response = await fetch(api, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-Token': this.getCookie('XSRF-TOKEN')!,
      },
      body: JSON.stringify(data),
    });
    if (response.redirected) {
      return false;
    } else {
      return true;
    }
  }
  getCookie(name:string): string | undefined {
    const nameLenPlus = name.length + 1;
    return document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0];
  }
}
