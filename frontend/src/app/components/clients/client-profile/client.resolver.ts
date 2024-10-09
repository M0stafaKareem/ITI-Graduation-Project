import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { ClientsService } from '../../../shared/services/clients.service';
import { Clients } from '../../../shared/models/clients.model';
import { CountryService } from '../../../shared/services/country.service';

@Injectable({
  providedIn: 'root',
})
export class ClientResolver implements Resolve<Clients> {
  constructor(
    private clientsService: ClientsService,
    private countryService: CountryService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Clients> {
    const clientId = +route.paramMap.get('id')!;
    return forkJoin({
      client: this.clientsService.getClientById(clientId),
      clientCategories: this.clientsService.getCategories(),
      countries: this.countryService.getCountries(),
    }).pipe(
      map((data) => {
        const { client, clientCategories, countries } = data;
        client.category = clientCategories.find(
          (category) => category.id === client.client_category_id
        );
        client.country = countries.find(
          (country) => country.id === client.country_id
        );
        return client;
      })
    );
  }
}
