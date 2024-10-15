import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class CaseSessionService {
  sessionsUrl: string = `${DOMAIN.test}/sessions`;

  constructor(private http: HttpClient) {}

  loadSessions(): Observable<any> {
    return this.http.get<any>(this.sessionsUrl);
  }

  loadSessionsByCaseId(caseId: number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.sessionsUrl}/cases/${caseId}`);
  }

  createSession(session: any): Observable<any> {
    return this.http.post<any>(this.sessionsUrl, session);
  }

  updateSession(sessionId: number, newSession: any): Observable<any> {
    return this.http.put(`${this.sessionsUrl}/${sessionId}`, newSession);
  }

  deleteSession(sessionId: number): any {
    this.http
      .delete(`${this.sessionsUrl}/${sessionId}`)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.sessionsUrl}/${id}`);
  }
}
