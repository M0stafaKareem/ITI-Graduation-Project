import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from '../models/case.model';
import { CaseCategory } from '../models/case.category.model';
import { InitiateRequestService } from './initiate-request.service';
import { ClientCategory } from '../models/client.category';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  getCasesURL = 'http://127.0.0.1:8000/api/Cases';
  categoriesApiUrl = 'http://127.0.0.1:8000/api/CaseCategories';
  CaseGradeUrl = 'http://127.0.0.1:8000/api/CaseGrades';

  constructor(
    private httpClient: InitiateRequestService,
    private http: HttpClient
  ) {}

  // Case-related API calls

  getCases(searchTerm: string = ''): Observable<Case[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<Case[]>(this.getCasesURL, { params });
  }

  getCaseById(id: number): Observable<Case> {
    return this.httpClient.get(`${this.getCasesURL}/${id}`);
  }

  insertCase(newCase: any): Observable<any> {
    return this.httpClient.post(this.getCasesURL, newCase);
  }

  updateCase(caseId: number, newCase: any): Observable<any> {
    return this.httpClient.put(
      `${this.getCasesURL}/${caseId}`,
      newCase,
      'text'
    );
  }

  deleteCase(caseId: any): Observable<any> {
    return this.httpClient.delete(`${this.getCasesURL}/${caseId}`, 'text');
  }

  // Category-related API calls
  getCategories(searchTerm: string = ''): Observable<CaseCategory[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<CaseCategory[]>(this.categoriesApiUrl, { params });
  }

  getCategoryById(id: number): Observable<CaseCategory> {
    return this.httpClient.get(`${this.categoriesApiUrl}/${id}`);
  }

  insertCategory(newCategory: any): Observable<any> {
    return this.httpClient.post(this.categoriesApiUrl, newCategory);
  }

  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    return this.httpClient.put(
      `${this.categoriesApiUrl}/${categoryId}`,
      newCategory,
      'text'
    );
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.httpClient.delete(
      `${this.categoriesApiUrl}/${categoryId}`,
      'text'
    );
  }

  // Case Grade-related API calls
  getCaseGrade(): Observable<any[]> {
    return this.httpClient.get(this.CaseGradeUrl);
  }

  insertCaseGrade(newGrade: any): Observable<any> {
    return this.httpClient.post(this.CaseGradeUrl, newGrade);
  }

  updateCaseGrade(gradeId: number, newGrade: any): Observable<any> {
    return this.httpClient.put(
      `${this.CaseGradeUrl}/${gradeId}`,
      newGrade,
      'text'
    );
  }

  deleteCaseGrade(gradeId: any): Observable<any> {
    return this.httpClient.delete(`${this.CaseGradeUrl}/${gradeId}`, 'text');
  }
}
