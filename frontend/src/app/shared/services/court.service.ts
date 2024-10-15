import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Court } from '../models/court.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  courtsUrl = `${DOMAIN.test}/courts`;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  getCourts(searchTerm: string = ''): Observable<Court[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm); // Set search query param if provided
    } else this.spinner.show();
    return this.httpClient
      .get<Court[]>(this.courtsUrl, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getCourtById(id: number): Observable<Court> {
    this.spinner.show();
    return this.httpClient
      .get<Court>(`${this.courtsUrl}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertCourt(newCourt: Court): Observable<Court> {
    this.spinner.show();
    return this.httpClient
      .post<Court>(this.courtsUrl, newCourt)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateCourt(courtId: any, newCourt: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.courtsUrl}/${courtId}`, newCourt, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteCourt(courtId: any) {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.courtsUrl}/${courtId}`, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }
}
