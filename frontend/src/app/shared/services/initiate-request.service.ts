import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitiateRequestService {
  private xsrfToken: string | undefined = undefined;

  get getXsrfToken() {
    return this.xsrfToken;
  }

  constructor(private http: HttpClient) {
    this.getTokenFromSanctum();
  }

  async getTokenFromSanctum() {
    console.log('GET TOKEN SANCTUM   ' + this.xsrfToken);
    this.xsrfToken
      ? null
      : await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include',
        });
    this.xsrfToken = this.getTokenFromCookie('XSRF-TOKEN');
  }
  // Method to get XSRF token from cookies
  getTokenFromCookie(name: string): string | undefined {
    const nameLenPlus = name.length + 1;

    return document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0];
  }

  // HTTP GET request with headers
  get(url: string): Observable<any> {
    console.log('GET    ' + this.xsrfToken);
    let headers = new HttpHeaders();
    headers = headers.append('X-XSRF-TOKEN', this.xsrfToken || '');
    return this.http.get<any>(url, { headers, withCredentials: true });
  }

  // HTTP POST request with headers
  post(url: string, data: any): Observable<any> {
    console.log('POST   ' + this.xsrfToken);

    let headers = new HttpHeaders();
    headers = headers.append('X-XSRF-TOKEN', this.xsrfToken || '');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(url, data, { headers, withCredentials: true });
  }

  // HTTP PUT request with headers and optional responseType
  put(
    url: string,
    data: any,
    responseType: 'json' | 'text' = 'json'
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('X-XSRF-TOKEN', this.xsrfToken || '');
    headers = headers.append('Content-Type', 'application/json');

    const options: any = {
      headers,
      withCredentials: true,
      responseType: responseType as 'json' | 'text',
    };

    return this.http.put(url, data, options);
  }

  // HTTP DELETE request with optional responseType
  delete(url: string, responseType: 'json' | 'text' = 'json'): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('X-XSRF-TOKEN', this.xsrfToken || '');

    const options: any = {
      headers,
      withCredentials: true,
      responseType: responseType as 'json' | 'text',
    };

    return this.http.delete(url, options);
  }
}
