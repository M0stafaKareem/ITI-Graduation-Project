import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Lawyers } from '../models/lawyers.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LawyersService {
  lawyersUrl = 'http://localhost:8000/api/lawyers';
  oppositeLawyersUrl = 'http://127.0.0.1:8000/api/opposinglawyers';
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  // getLawyers(): Observable<Lawyers[]> {
  //   return this.httpClient.get<Lawyers[]>(this.lawyersUrl);
  // }

  getLawyers(searchTerm: string = ''): Observable<Lawyers[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    this.spinner.show();
    return this.httpClient
      .get<Lawyers[]>(this.lawyersUrl, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getLawyerById(id: number): Observable<Lawyers> {
    this.spinner.show();
    return this.httpClient
      .get<Lawyers>(`${this.lawyersUrl}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertLawyer(newLawyer: Lawyers): Observable<Lawyers> {
    this.spinner.show();
    return this.httpClient
      .post<Lawyers>(this.lawyersUrl, newLawyer)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateLawyer(lawyerId: any, newLawyer: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.lawyersUrl}/${lawyerId}`, newLawyer, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteLawyer(lawyerId: any) {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.lawyersUrl}/${lawyerId}`, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getOppositeLawyers(searchTerm: string = ''): Observable<Lawyers[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    this.spinner.show();
    return this.httpClient
      .get<Lawyers[]>(`${this.oppositeLawyersUrl}`, {
        params,
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getOppositeLawyerById(id: number): Observable<Lawyers> {
    this.spinner.show();
    return this.httpClient
      .get<Lawyers>(`${this.oppositeLawyersUrl}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertOppositeLawyer(newLawyer: Lawyers): Observable<Lawyers> {
    this.spinner.show();
    return this.httpClient
      .post<Lawyers>(this.oppositeLawyersUrl, newLawyer)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateOppositeLawyer(lawyerId: any, newLawyer: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.oppositeLawyersUrl}/${lawyerId}`, newLawyer, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteOppositeLawyer(lawyerId: any) {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.oppositeLawyersUrl}/${lawyerId}`, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }
}
