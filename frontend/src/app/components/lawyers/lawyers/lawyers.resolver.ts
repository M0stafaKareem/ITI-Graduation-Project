import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { Lawyers } from '../../../shared/models/lawyers.model';
import { LawyersService } from '../../../shared/services/lawyers.service';

@Injectable({
  providedIn: 'root',
})
export class LawyersResolver implements Resolve<any> {
  constructor(
    private lawyerService: LawyersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';

    return forkJoin({
      lawyers: this.lawyerService.getLawyers(searchTerm),
    });
  }
}
