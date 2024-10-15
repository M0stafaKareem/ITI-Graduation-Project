import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {
  eventsUrl: string = `${DOMAIN.test}/events`;
  events: any[] = [];

  constructor(private http: HttpClient) {}

  loadEvents(): Observable<any> {
    return this.http.get<any>(this.eventsUrl);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.eventsUrl, event);
  }

  updateEvent(event: any): void {
    this.http
      .put(`${this.eventsUrl}/${event.id}`, event)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  deleteEvent(event: any): void {
    this.http
      .delete(`${this.eventsUrl}/${event.id}`)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
