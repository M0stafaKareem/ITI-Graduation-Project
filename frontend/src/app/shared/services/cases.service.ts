import { HttpClient, HttpParams } from '@angular/common/http';
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
  CaseGradeUrl = 'http://127.0.0.1:8000/api/CaseGrades/';

  constructor(public httpClient: HttpClient) {}


  getCases(searchTerm: string = ''): Observable<Case[]> {
    let params = new HttpParams();
    if (searchTerm) {
      console.log(searchTerm);
      params = params.set('search', searchTerm);  // Set search query param if provided
    } 
    console.log(params);
    return this.httpClient.get<Case[]>(this.getCasesURL, { params });}

  getCaseById(id: number): Observable<Case> {
    return this.httpClient.get<Case>(`${this.getCasesURL}/${id}`);
  }
  insertCase(newCase: any): Observable<any> {
    return this.httpClient.post(this.getCasesURL, newCase);
  }
  updateCase(caseId: number, newCase: any): Observable<any> {
    return this.httpClient.put(`${this.getCasesURL}/${caseId}`, newCase, {
      responseType: 'text',
    });
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
      newCategory,
      { responseType: 'text' }
    );
  }

  getCaseGrade(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.CaseGradeUrl);
  }
  insertCaseGrade(newGrade: any): Observable<any> {
    return this.httpClient.post(this.CaseGradeUrl, newGrade);
  }
  updateCaseGrade(gradeId: number, newGrade: any): Observable<any> {
    return this.httpClient.put(
      `${this.categoriesApiUrl}/${gradeId}`,
      newGrade,
      { responseType: 'text' }
    );
  }

  deleteCaseGrade(gradeId: any) {
    return this.httpClient.delete(`${this.CaseGradeUrl}/${gradeId}`, {
      responseType: 'text',
    });
  }

  deleteCase(caseId: any) {
    return this.httpClient.delete(`${this.getCasesURL}/${caseId}`, {
      responseType: 'text',
    });
  }
  deleteCategory(categoryId: any) {
    return this.httpClient.delete(`${this.categoriesApiUrl}/${categoryId}`, {
      responseType: 'text',
    });
  }
}
