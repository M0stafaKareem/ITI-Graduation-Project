import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface message {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  api = 'http://127.0.0.1:8000/api/Guest-Application';

  sendContactMessage(application: message): Observable<any> {
    return this.http.post(this.api, application);
  }
}
