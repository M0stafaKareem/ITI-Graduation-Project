import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl: string = 'http://127.0.0.1:8000/api/Countries';
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  getCountries(): Observable<any[]> {
    this.spinner.show();
    return this.httpClient
      .get<any[]>(this.countriesUrl)
      .pipe(finalize(() => this.spinner.hide()));
  }
  getCountryCities(cityId: number): Observable<any[]> {
    this.spinner.show();
    return this.httpClient
      .get<any[]>(`${this.countriesUrl}/${cityId}/Cities`)
      .pipe(finalize(() => this.spinner.hide()));
  }
}
