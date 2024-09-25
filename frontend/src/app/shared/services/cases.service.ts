import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from '../models/case.model';
import { CaseCategory } from '../models/case.category.model';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  getCasesURL = 'http://127.0.0.1:8000/api/Cases';
  categoriesApiUrl = 'http://127.0.0.1:8000/api/CaseCategories';
  CaseGrade = 'http://127.0.0.1:8000/api/CaseGrades';

  constructor(public httpClient: HttpClient) {}

  getCases(): Observable<any> {
    return this.httpClient.get(this.getCasesURL);
  }

  getCaseById(id: number): Observable<Case> {
    return this.httpClient.get<Case>(`${this.getCasesURL}/${id}`);
  }
  insertCase(newCase: any): Observable<any> {
    return this.httpClient.post(this.getCasesURL, newCase);
  }
  updateCase(caseId: number, newCase: any): Observable<any> {
    return this.httpClient.put(`${this.getCasesURL}/${caseId}`, newCase);
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.categoriesApiUrl);
  }

  getCategoryById(id: number): Observable<CaseCategory> {
    return this.httpClient.get<CaseCategory>(`${this.categoriesApiUrl}/${id}`);
  }

  insertCategory(newCategory: any): Observable<any> {
    return this.httpClient.post(this.categoriesApiUrl, newCategory);
  }
  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    return this.httpClient.put(
      `${this.categoriesApiUrl}/${categoryId}`,
      newCategory
    );
  }

  getCaseGrade(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.CaseGrade);
  }

  deleteCase(caseId: any) {
    return this.httpClient.delete(`${this.getCasesURL}/${caseId}`);
  }
  deleteCategory(categoryId: any) {
    return this.httpClient.delete(`${this.categoriesApiUrl}/${categoryId}`);
  }
}
