import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../../../shared/services/clients.service';
import { ClientCategory } from '../../../shared/models/client.category';

@Injectable({
  providedIn: 'root',
})
export class ClientCategoryResolver implements Resolve<ClientCategory[]> {
  constructor(private clientService: ClientsService) {}

  resolve(): Observable<ClientCategory[]> {
    return this.clientService.getCategories();
  }
}
