import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { TableComponent } from '../../shared/table/table.component';
import { ClientsService } from '../../shared/services/clients.service';
import { Clients } from '../../shared/models/clients.model';
import {
  inputType,
  AddingFormComponent,
} from '../../shared/adding-form/adding-form.component';
import { CountryService } from '../../shared/services/country.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SecondaryNavComponent,
    TableComponent,
    AddingFormComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css', '../cases/cases.component.css'],
})
export class ClientsComponent implements OnInit {
  clients?: Array<Clients>;
  countries?: {
    id: string;
    name: string;
    code: string;
    phonecode: string;
  }[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Client';
  upaddingClientId?: number;
  newClientInputRows!: inputType[];

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
    this.clients = resolvedData.clients;
    this.countries = resolvedData.countries;
  }

  addNewClient(newClient: any): void {
    this.clientsService.insertClient(newClient).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  toggleFormVisibility = (clientId?: number) => {
    this.upaddingClientId = clientId;
    const targetCliet = this.clients?.find(
      (clients) => clients.id === clientId
    );
    this.newClientInputRows = [
      {
        id: '1',
        title: 'Client Name',
        type: 'text',
        value: targetCliet ? targetCliet.name : undefined,
      },
      {
        id: '2',
        title: 'Country',
        type: 'select',
        options: this.countries?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCliet ? '' + targetCliet.country_id : undefined,
      },
      {
        id: '3',
        title: 'City',
        type: 'text',
        value: targetCliet ? '' + targetCliet.city_id : undefined,
      },
      {
        id: '4',
        title: 'State',
        type: 'text',
        value: targetCliet ? '' + targetCliet.state_id : undefined,
      },
      {
        id: '5',
        title: 'Role',
        type: 'select',
        options: [
          { id: 'Defendant', value: 'Defendant' },
          { id: 'Plaintiff', value: 'Plaintiff' },
          { id: 'Accused', value: 'Accused' },
          { id: 'Victim', value: 'Victim' },
          { id: 'Witness', value: 'Witness' },
          { id: 'Other', value: 'Other' },
        ],
        value: targetCliet ? targetCliet.role : undefined,
      },
      {
        id: '6',
        title: 'Mobile',
        type: 'text',
        value: targetCliet ? targetCliet.mobile : undefined,
      },
      {
        id: '7',
        title: 'Email',
        type: 'email',
        value: targetCliet ? targetCliet.email : undefined,
      },
      {
        id: '8',
        title: 'Gender',
        type: 'select',
        options: [
          { id: '0', value: 'Male' },
          { id: '1', value: 'Female' },
        ],
        value: targetCliet ? targetCliet.gender : undefined,
      },
      {
        id: '9',
        title: 'Adress',
        type: 'text',
        value: targetCliet ? targetCliet.address : undefined,
      },
      {
        id: '10',
        title: 'Description',
        type: 'text',
        value: targetCliet ? targetCliet.description : undefined,
      },
    ];
    if (targetCliet) {
      this.formHeader = 'Update Client';
      this.formType = 'Update';
    }
    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = (data: any) => {
    const clientData: Clients = {
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
    };
    if (this.formType === 'Add') {
      this.addNewClient(clientData);
    } else if (this.formType === 'Update') {
      this.updateClient(this.upaddingClientId!, clientData);
    }
    this.clients!.push(clientData);
    this.toggleFormVisibility();
  };

  updateClient(clientId: number, updatedClient: any): void {
    this.clientsService.updateClient(clientId, updatedClient).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  onActionSelect(event: any, clientId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteClient(clientId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(clientId);
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
