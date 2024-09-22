import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl: string = 'http://127.0.0.1:8000/api/Countries';
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.countriesUrl);
  }
  getCountryCities(cityId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.countriesUrl}/${cityId}/Cities`);
  }
}
