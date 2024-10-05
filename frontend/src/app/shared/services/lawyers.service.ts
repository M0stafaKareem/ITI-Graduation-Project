import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lawyers } from '../models/lawyers.model';

@Injectable({
  providedIn: 'root',
})
export class LawyersService {
  lawyersUrl = 'http://localhost:8000/api/lawyers';
  oppositeLawyersUrl = 'http://127.0.0.1:8000/api/opposinglawyers';
  constructor(private httpClient: HttpClient) {}

  // getLawyers(): Observable<Lawyers[]> {
  //   return this.httpClient.get<Lawyers[]>(this.lawyersUrl);
  // }

  getLawyers(searchTerm: string = ''): Observable<Lawyers[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.httpClient.get<Lawyers[]>(this.lawyersUrl, { params });
  }

  getLawyerById(id: number): Observable<Lawyers> {
    return this.httpClient.get<Lawyers>(`${this.lawyersUrl}/${id}`);
  }

  insertLawyer(newLawyer: Lawyers): Observable<Lawyers> {
    return this.httpClient.post<Lawyers>(this.lawyersUrl, newLawyer);
  }

  updateLawyer(lawyerId: any, newLawyer: any): Observable<any> {
    return this.httpClient.put(`${this.lawyersUrl}/${lawyerId}`, newLawyer, {
      responseType: 'text',
    });
  }

  deleteLawyer(lawyerId: any) {
    return this.httpClient.delete(`${this.lawyersUrl}/${lawyerId}`, {
      responseType: 'text',
    });
  }

  getOppositeLawyers(): Observable<Lawyers[]> {
    return this.httpClient.get<Lawyers[]>(`${this.oppositeLawyersUrl}`);
  }

  getOppositeLawyerById(id: number): Observable<Lawyers> {
    return this.httpClient.get<Lawyers>(`${this.oppositeLawyersUrl}/${id}`);
  }

  insertOppositeLawyer(newLawyer: Lawyers): Observable<Lawyers> {
    return this.httpClient.post<Lawyers>(this.oppositeLawyersUrl, newLawyer);
  }

  updateOppositeLawyer(lawyerId: any, newLawyer: any): Observable<any> {
    return this.httpClient.put(
      `${this.oppositeLawyersUrl}/${lawyerId}`,
      newLawyer,
      {
        responseType: 'text',
      }
    );
  }

  deleteOppositeLawyer(lawyerId: any) {
    return this.httpClient.delete(`${this.oppositeLawyersUrl}/${lawyerId}`, {
      responseType: 'text',
    });
  }
}
