import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseCategory } from '../../../shared/models/case.category.model';

@Injectable({
  providedIn: 'root',
})
export class CaseCategoryResolver implements Resolve<any[]> {
  constructor(
    private casesService: CasesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';
    return forkJoin({
      caseCategories: this.casesService.getCategories(),
      cases: this.casesService.getCases(searchTerm),
    })
    // return this.casesService.getCategories();
  }
}
