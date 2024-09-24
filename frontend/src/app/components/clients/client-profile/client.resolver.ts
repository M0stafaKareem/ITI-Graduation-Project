import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../../../shared/services/clients.service';
import { Clients } from '../../../shared/models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientResolver implements Resolve<Clients> {
  constructor(private clientsService: ClientsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Clients> {
    const clientId = +route.paramMap.get('id')!;
    return this.clientsService.getClientById(clientId);
  }
}
