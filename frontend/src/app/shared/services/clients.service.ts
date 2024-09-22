import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientsUrl = 'http://127.0.0.1:8000/api/Clients';
  constructor(private httpClient: HttpClient) {}

  getClients(): Observable<any> {
    return this.httpClient.get<any[]>(this.clientsUrl);
  }
  insertClient(newClient: any): Observable<any> {
    return this.httpClient.post(this.clientsUrl, newClient);
  }
  updateClient(clientId: number, updatedClient: any) {
    return this.httpClient.put(`${this.clientsUrl}/${clientId}`, updatedClient);
  }

  deleteClient(clienId: any) {
    return this.httpClient.delete(`${this.clientsUrl}/${clienId}`);
  }
}
