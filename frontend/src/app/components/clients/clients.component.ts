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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientCategory } from '../../shared/models/client.category';

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
  clientCategories!: ClientCategory[];

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
    this.clients = resolvedData.clients;
    this.clientCategories = resolvedData.clientCategories;
    this.countries = resolvedData.countries;
  }

  addNewClient(newClient: any) {
    return new Promise((resolve) => {
      this.clientsService.insertClient(newClient).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(false);
        },
      });
    });
  }

  updateClient(clientId: number, updatedClient: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.clientsService.updateClient(clientId, updatedClient).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(false);
        },
      });
    });
  }

  toggleFormVisibility = (clientId?: number) => {
    this.upaddingClientId = clientId;
    const targetCliet = this.clients?.find(
      (clients) => clients.id === clientId
    );
    this.newClientInputRows = [
      {
        backed_key: 'name',
        title: 'Client Name',
        type: 'text',
        value: targetCliet ? targetCliet.name : undefined,
      },
      {
        backed_key: 'country_id',
        title: 'Country',
        type: 'select',
        options: this.countries?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCliet ? '' + targetCliet.country_id : undefined,
      },
      {
        backed_key: 'city_id',
        title: 'City',
        type: 'text',
        value: targetCliet ? '' + targetCliet.city_id : undefined,
      },
      {
        backed_key: 'client_category',
        title: 'Client Category',
        type: 'select',
        options: this.clientCategories?.map((item) => {
          return { id: '' + item.id, value: item.category_name };
        }),
        value: targetCliet ? '' + targetCliet.state_id : undefined,
      },
      {
        backed_key: 'role',
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
        backed_key: 'mobile',
        title: 'Mobile',
        type: 'text',
        value: targetCliet ? targetCliet.mobile : undefined,
      },
      {
        backed_key: 'email',
        title: 'Email',
        type: 'email',
        value: targetCliet ? targetCliet.email : undefined,
      },
      {
        backed_key: 'gender',
        title: 'Gender',
        type: 'select',
        options: [
          { id: '0', value: 'Male' },
          { id: '1', value: 'Female' },
        ],
        value: targetCliet ? targetCliet.gender : undefined,
      },
      {
        backed_key: 'address',
        title: 'Address',
        type: 'text',
        value: targetCliet ? targetCliet.address : undefined,
      },
      {
        backed_key: 'description',
        title: 'Description',
        type: 'text',
        value: targetCliet ? targetCliet.description : undefined,
      },
    ];
    if (clientId && targetCliet) {
      this.formHeader = 'Update Client';
      this.formType = 'Update';
    }
    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (clientData: Clients) => {
    if (this.formType === 'Add') {
      this.addNewClient(clientData).then((result) => {
        if (result) {
          this.clients?.push(clientData);
        } else {
          console.log('failed to add client');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateClient(this.upaddingClientId!, clientData).then(
        (result) => {
          if (result) {
            this.clients = this.clients?.map((client) => {
              if (client.id == this.upaddingClientId) {
                console.log(clientData);
                return clientData;
              }
              return client;
            });
          } else {
            console.log('failed to update client');
          }
        }
      );
    }
    this.toggleFormVisibility();
  };

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
