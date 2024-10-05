import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Court } from '../models/court.model';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  courtsUrl = 'http://127.0.0.1:8000/api/courts';

  constructor(private httpClient: HttpClient) {}

  getCourts(searchTerm: string = ''): Observable<Court[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);  // Set search query param if provided
    }

    return this.httpClient.get<Court[]>(this.courtsUrl, { params });
  }

  getCourtById(id: number): Observable<Court> {
    return this.httpClient.get<Court>(`${this.courtsUrl}/${id}`);
  }

  insertCourt(newCourt: Court): Observable<Court> {
    return this.httpClient.post<Court>(this.courtsUrl, newCourt);
  }

  updateCourt(courtId: any, newCourt: any): Observable<any> {
    return this.httpClient.put(`${this.courtsUrl}/${courtId}`, newCourt, {
      responseType: 'text',
    });
  }

  deleteCourt(courtId: any) {
    return this.httpClient.delete(`${this.courtsUrl}/${courtId}`, {
      responseType: 'text',
    });
  }
}
