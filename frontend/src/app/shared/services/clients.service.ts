import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Clients } from '../models/clients.model';
import { ClientCategory } from '../models/client.category';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOMAIN } from '../constants/domain';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientsUrl = `${DOMAIN.test}/Clients`;
  clientCategoryUrl = `${DOMAIN.test}/ClientCategories`;
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  getClients(searchTerm: string = ''): Observable<Clients[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm); // Set search query param if provided
    } else {
      this.spinner.show();
    }
    return this.httpClient
      .get<Clients[]>(this.clientsUrl, { params })
      .pipe(finalize(() => this.spinner.hide()));
  }

  getClientById(id: number): Observable<Clients> {
    this.spinner.show();
    return this.httpClient
      .get<Clients>(`${this.clientsUrl}/${id}`)
      .pipe(finalize(() => this.spinner.hide()));
  }

  getCategories(searchTerm: string = ''): Observable<ClientCategory[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    } else {
      this.spinner.show();
    }
    return this.httpClient
      .get<ClientCategory[]>(`${this.clientCategoryUrl}`, {
        params,
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteCategory(categoryId: any) {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.clientCategoryUrl}/${categoryId}`, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertCategory(newCategory: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .post(this.clientCategoryUrl, newCategory)
      .pipe(finalize(() => this.spinner.hide()));
  }
  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    this.spinner.show();
    return this.httpClient
      .put(`${this.clientCategoryUrl}/${categoryId}`, newCategory, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  insertClient(newClient: Clients): Observable<Clients> {
    this.spinner.show();
    return this.httpClient
      .post<Clients>(this.clientsUrl, newClient)
      .pipe(finalize(() => this.spinner.hide()));
  }
  updateClient(clientId: number, updatedClient: Clients) {
    this.spinner.show();
    return this.httpClient
      .put(`${this.clientsUrl}/${clientId}`, updatedClient, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteClient(clienId: number) {
    this.spinner.show();
    return this.httpClient
      .delete(`${this.clientsUrl}/${clienId}`, {
        responseType: 'text',
      })
      .pipe(finalize(() => this.spinner.hide()));
  }
}
