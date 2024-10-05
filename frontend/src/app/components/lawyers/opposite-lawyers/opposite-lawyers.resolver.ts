import { Injectable } from '@angular/core';
import { Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { Lawyers } from '../../../shared/models/lawyers.model';
import { LawyersService } from '../../../shared/services/lawyers.service';

@Injectable({
  providedIn: 'root',
})
export class OppositeLawyersResolver implements Resolve<any> {
  constructor(
    private lawyerService: LawyersService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';
    return forkJoin({
      oppositeLawyers: this.lawyerService.getOppositeLawyers(searchTerm),
    });
    // return this.lawyerService.getOppositeLawyers();
  }
}
