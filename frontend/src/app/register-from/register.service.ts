import { Injectable } from '@angular/core';
import { InitiateRequestService } from '../shared/services/initiate-request.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: InitiateRequestService) {}

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ success: boolean; errors?: any }> {
    const api = 'http://localhost:8000/register';

    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    });

    const response = await fetch(api, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-Token': this.httpClient.getXsrfToken!,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }
  }
}
