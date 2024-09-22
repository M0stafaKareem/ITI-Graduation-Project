import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientsUrl = 'http://127.0.0.1:8000/api/Clients';
  constructor(private httpClient: HttpClient) {}

  getClients(): Observable<Clients[]> {
    return this.httpClient.get<Clients[]>(this.clientsUrl);
  }
  insertClient(newClient: Clients): Observable<Clients> {
    return this.httpClient.post<Clients>(this.clientsUrl, newClient);
  }
  updateClient(clientId: number, updatedClient: Clients) {
    return this.httpClient.put(`${this.clientsUrl}/${clientId}`, updatedClient);
  }

  deleteClient(clienId: number) {
    return this.httpClient.delete(`${this.clientsUrl}/${clienId}`);
  }
}
