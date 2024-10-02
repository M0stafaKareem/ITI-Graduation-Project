import { Injectable } from '@angular/core';
import { InitiateRequestService } from '../../shared/services/initiate-request.service';

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
  }) {
    const api = 'http://localhost:8000/register';

    const token = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
    });

    return await fetch(api, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-Token': this.httpClient.getXsrfToken!,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  }
}
