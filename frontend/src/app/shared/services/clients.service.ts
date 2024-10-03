import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from '../models/clients.model';
import { ClientCategory } from '../models/client.category';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientsUrl = 'http://127.0.0.1:8000/api/Clients';
  clientCategoryUrl = 'http://127.0.0.1:8000/api/ClientCategories';
  constructor(private httpClient: HttpClient) {}

  getClients(searchTerm: string = ''): Observable<Clients[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);  // Set search query param if provided
    }

    return this.httpClient.get<Clients[]>(this.clientsUrl, { params });
  }

  getClientById(id: number): Observable<Clients> {
    return this.httpClient.get<Clients>(`${this.clientsUrl}/${id}`);
  }

  getCategories(): Observable<ClientCategory[]> {
    return this.httpClient.get<ClientCategory[]>(`${this.clientCategoryUrl}`);
  }

  deleteCategory(categoryId: any) {
    return this.httpClient.delete(`${this.clientCategoryUrl}/${categoryId}`, {
      responseType: 'text',
    });
  }

  insertCategory(newCategory: any): Observable<any> {
    return this.httpClient.post(this.clientCategoryUrl, newCategory);
  }
  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    return this.httpClient.put(
      `${this.clientCategoryUrl}/${categoryId}`,
      newCategory,
      { responseType: 'text' }
    );
  }

  insertClient(newClient: Clients): Observable<Clients> {
    return this.httpClient.post<Clients>(this.clientsUrl, newClient);
  }
  updateClient(clientId: number, updatedClient: Clients) {
    return this.httpClient.put(
      `${this.clientsUrl}/${clientId}`,
      updatedClient,
      { responseType: 'text' }
    );
  }

  deleteClient(clienId: number) {
    return this.httpClient.delete(`${this.clientsUrl}/${clienId}`, {
      responseType: 'text',
    });
  }
}
