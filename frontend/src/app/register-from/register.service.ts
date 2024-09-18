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
    const api = 'http://localhost:8000/api/register';
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.redirected) {
      return false;
    } else {
      return true;
    }
  }
}
