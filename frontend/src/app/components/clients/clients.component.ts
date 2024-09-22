import { Component, OnInit } from '@angular/core';

import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { TableComponent } from '../../shared/table/table.component';
import { ClientsService } from '../../shared/services/clients.service';
import { Clients } from '../../shared/models/clients.model';
import {
  inputType,
  AddingFormComponent,
} from '../../shared/adding-form/adding-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SecondaryNavComponent,
    TableComponent,
    AddingFormComponent,
    CommonModule,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css', '../cases/cases.component.css'],
})
export class ClientsComponent implements OnInit {
  clients?: Array<Clients>;
  loading: boolean = false;
  isFormVisible: boolean = false;

  constructor(private clientsService: ClientsService) {}

  newClientInputRows!: inputType[];
  toggleFormVisibility = () => {
    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = (data: any) => {
    this.addNewClient({
      name: data[0],
      country_id: data[1],
      city_id: data[2],
      state_id: data[3],
      role: data[4],
      mobile: data[5],
      email: data[6],
      gender: data[7],
      address: data[8],
      description: data[9],
    });
    this.toggleFormVisibility();
  };

  ngOnInit(): void {
    this.getClients();
  }

  ngDoCheck() {
    this.newClientInputRows = [
      { id: '1', title: 'Client Name', type: 'text' },
      { id: '2', title: 'Country', type: 'text' },
      { id: '3', title: 'City', type: 'text' },
      { id: '4', title: 'State', type: 'text' },
      { id: '5', title: 'Role', type: 'text' },
      { id: '6', title: 'Mobile', type: 'text' },
      { id: '7', title: 'Email', type: 'email' },
      {
        id: '8',
        title: 'Gender',
        type: 'select',
        options: [
          { id: '0', value: 'Male' },
          { id: '1', value: 'Female' },
        ],
      },
      { id: '9', title: 'Adress', type: 'text' },
      { id: '10', title: 'Description', type: 'text' },
    ];
  }

  addNewClient(newClient: any): void {
    this.clientsService.insertClient(newClient).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }
  getClients() {
    this.clientsService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log(this.clients);
      },
      error: (error) => {
        console.error('Error retrieving clients:', error);
      },
    });
  }

  onActionSelect(event: any, clientId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteClient(clientId);
    }
  }

  deleteClient(clientId: number): void {
    if (confirm('Are you sure you want to delete this case?')) {
      this.loading = true;
      this.clientsService.deleteClient(clientId).subscribe({
        next: () => {
          this.clients = this.clients?.filter(
            (clientItem: any) => clientItem.id !== clientId
          );

          this.loading = false;
        },
        error: (error) => {
          console.error('Error deleting case:', error);
          this.loading = false;
        },
      });
    }
  }
}
