import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  insertCase(newCase: any): Observable<any> {
    return this.httpClient.post(this.getCasesURL, newCase);
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.categoriesApiUrl);
  }

  getCaseGrade(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.CaseGrade);
  }

  deleteCase(caseId: any) {
    return this.httpClient.delete(`${this.getCasesURL}/${caseId}`);
  }
}
