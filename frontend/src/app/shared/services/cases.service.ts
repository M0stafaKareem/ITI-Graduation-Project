import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Case } from '../models/case.model';
import { CaseCategory } from '../models/case.category.model';
import { InitiateRequestService } from './initiate-request.service';
import { ClientCategory } from '../models/client.category';
import { CaseGrade } from '../models/case.grade.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  getCasesURL = `${DOMAIN.test}/Cases`;
  categoriesApiUrl = `${DOMAIN.test}/CaseCategories`;
  CaseGradeUrl = `${DOMAIN.test}/CaseGrades`;

  constructor(
    private httpClient: InitiateRequestService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  getCases(searchTerm: string = ''): Observable<Case[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    } else this.spinner.show();

    return this.http
      .get<Case[]>(this.getCasesURL, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getCaseById(id: number): Observable<Case> {
    this.spinner.show();
    return this.httpClient
      .get(`${this.getCasesURL}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertCase(newCase: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .post(this.getCasesURL, newCase)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateCase(caseId: number, newCase: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.getCasesURL}/${caseId}`, newCase, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteCase(caseId: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.getCasesURL}/${caseId}`, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }

  getCategories(searchTerm: string = ''): Observable<CaseCategory[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    } else this.spinner.show();
    return this.http
      .get<CaseCategory[]>(this.categoriesApiUrl, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getCategoryById(id: number): Observable<CaseCategory> {
    this.spinner.show();
    return this.httpClient
      .get(`${this.categoriesApiUrl}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertCategory(newCategory: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .post(this.categoriesApiUrl, newCategory)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.categoriesApiUrl}/${categoryId}`, newCategory, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteCategory(categoryId: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.categoriesApiUrl}/${categoryId}`, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }

  // Case Grade-related API calls
  getCaseGrade(searchTerm: string = ''): Observable<CaseGrade[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    } else this.spinner.show();
    return this.http
      .get<CaseGrade[]>(this.CaseGradeUrl, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertCaseGrade(newGrade: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .post(this.CaseGradeUrl, newGrade)
      .pipe(finalize(() => this.spinner.hide()));
  }

  updateCaseGrade(gradeId: number, newGrade: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.CaseGradeUrl}/${gradeId}`, newGrade, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteCaseGrade(gradeId: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.CaseGradeUrl}/${gradeId}`, 'text')
      .pipe(finalize(() => this.spinner.hide()));
  }
}
