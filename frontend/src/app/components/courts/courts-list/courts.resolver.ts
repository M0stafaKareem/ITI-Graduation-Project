import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Court } from '../../../shared/models/court.model';
import { CourtService } from '../../../shared/services/court.service';

@Injectable({
  providedIn: 'root',
})
export class CourtsResolver implements Resolve<any> {
  constructor(private courtService: CourtService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // get the search term from query params
    const searchTerm = route.queryParams['search'] || '';
    return forkJoin({
      courts: this.courtService.getCourts(searchTerm),
    });
  }
}
