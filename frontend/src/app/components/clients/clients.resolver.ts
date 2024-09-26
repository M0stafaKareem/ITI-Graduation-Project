import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ClientsService } from '../../shared/services/clients.service';
import { CountryService } from '../../shared/services/country.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsResolver implements Resolve<any> {
  constructor(
    private clientsService: ClientsService,
    private countryService: CountryService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin({
      clients: this.clientsService.getClients(),
      clientCategories: this.clientsService.getCategories(),
      countries: this.countryService.getCountries(),
    });
  }
}
