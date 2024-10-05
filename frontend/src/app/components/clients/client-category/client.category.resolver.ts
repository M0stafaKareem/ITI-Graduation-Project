import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ClientsService } from '../../../shared/services/clients.service';
import { ClientCategory } from '../../../shared/models/client.category';

@Injectable({
  providedIn: 'root',
})
export class ClientCategoryResolver implements Resolve<any[]> {
  constructor(
    private clientService: ClientsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const searchTerm = route.queryParams['search'] || '';

    return forkJoin({
      clientCategories: this.clientService.getCategories(),
      clients: this.clientService.getClients(searchTerm),
    })
  }
}
