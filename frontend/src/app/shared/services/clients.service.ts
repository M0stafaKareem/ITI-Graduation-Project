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
  deleteClient(clienId: any) {
    return this.httpClient.delete(`${this.clientsUrl}/${clienId}`);
  }
}
