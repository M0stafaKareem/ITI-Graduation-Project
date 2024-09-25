import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Case } from '../../../shared/models/case.model';
import { Clients } from '../../../shared/models/clients.model';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { CasesService } from '../../../shared/services/cases.service';
import { ClientsService } from '../../../shared/services/clients.service';

@Injectable({
  providedIn: 'root',
})
export class CaseResolver implements Resolve<any> {
  constructor(
    private caseService: CasesService,
    private clientsService: ClientsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const caseId = +route.paramMap.get('id')!;

    return this.caseService.getCaseById(caseId).pipe(
      switchMap((caseData: Case) => {
        return forkJoin({
          case: this.caseService.getCaseById(caseId),
          client: this.clientsService.getClientById(caseData.client_id),
          category: this.caseService.getCategoryById(caseData.case_category_id),
        });
      })
    );
  }
}
