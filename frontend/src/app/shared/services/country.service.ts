import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl: string = `${DOMAIN.test}/Countries`;
  private citiesUrl: string = `${DOMAIN.test}/Cities`;
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
