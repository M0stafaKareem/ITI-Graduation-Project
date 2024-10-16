import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from './inbox.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmApplicationService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:8000/api/Guest-Application';

  getAllApplications() {
    return this.http.get<Mail[]>(this.api);
  }
  sendResponse(mailData: { email: string; message: string }) {
    return this.http.post(this.api, mailData);
  }
}
