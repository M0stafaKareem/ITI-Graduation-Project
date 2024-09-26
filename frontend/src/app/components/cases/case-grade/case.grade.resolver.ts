import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseGrade } from '../../../shared/models/case.grade.model';

@Injectable({
  providedIn: 'root',
})
export class CaseGradeResolver implements Resolve<CaseGrade[]> {
  constructor(private casesService: CasesService) {}

  resolve(): Observable<CaseGrade[]> {
    return this.casesService.getCaseGrade();
  }
}
