import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CasesService } from '../../../shared/services/cases.service';
import { ClientsService } from '../../../shared/services/clients.service';
import { CourtService } from '../../../shared/services/court.service';
import { LawyersService } from '../../../shared/services/lawyers.service';

@Injectable({
  providedIn: 'root',
})
export class CasesResolver implements Resolve<any> {
  constructor(
    private caseService: CasesService,
    private clientService: ClientsService,
    private courtService: CourtService,
    private lawyerService: LawyersService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';
    return forkJoin({
      cases: this.caseService.getCases(searchTerm),
      categories: this.caseService.getCategories(),
      grades: this.caseService.getCaseGrade(),
      clients: this.clientService.getClients(),
      courts: this.courtService.getCourts(),
      lawyers: this.lawyerService.getLawyers(),
      oppositeLawyers: this.lawyerService.getOppositeLawyers(),
    }).pipe(
      map((data) => {
        const {
          cases,
          categories,
          grades,
          clients,
          courts,
          lawyers,
          oppositeLawyers,
        } = data;

        const enrichedCases = cases.map((caseItem: any) => {
          const client = clients.find(
            (client: any) => client.id === caseItem.client_id
          );

          return {
            ...caseItem,
            categoryName:
              categories.find(
                (cat: any) => cat.id === caseItem.case_category_id
              )?.name || 'No Category',
            case_grade:
              grades.find((grade: any) => grade.id === caseItem.case_grade_id)
                ?.name || 'No Grade',
            client: client || null, // Ensure client is assigned here
            court:
              courts.find((court: any) => court.id === caseItem.court_id) ||
              null,
            lawyer:
              lawyers.find((lawyer: any) => lawyer.id === caseItem.lawyer_id) ||
              null,
            oppositeLawyer:
              oppositeLawyers.find(
                (oppositeLawyer: any) =>
                  oppositeLawyer.id === caseItem.opposing_lawyer_id
              ) || null,
          };
        });
        return {
          cases: enrichedCases,
          categories,
          grades,
          clients,
          courts,
          lawyers,
          oppositeLawyers,
        };
      })
    );
  }
}
