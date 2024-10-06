import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseGrade } from '../../../shared/models/case.grade.model';

@Injectable({
  providedIn: 'root',
})
export class CaseGradeResolver implements Resolve<any[]> {
  constructor(
    private casesService: CasesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';
    return forkJoin({
      cases: this.casesService.getCases(searchTerm),
      caseGrades: this.casesService.getCaseGrade(),
    })
    // return this.casesService.getCaseGrade();
  }
}
