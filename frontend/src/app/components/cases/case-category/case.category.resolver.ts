import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseCategory } from '../../../shared/models/case.category.model';

@Injectable({
  providedIn: 'root',
})
export class CaseCategoryResolver implements Resolve<CaseCategory[]> {
  constructor(private casesService: CasesService) {}

  resolve(): Observable<CaseCategory[]> {
    return this.casesService.getCategories();
  }
}
