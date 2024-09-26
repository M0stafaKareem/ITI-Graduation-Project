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
import { CountryService } from '../../shared/services/country.service';
import { BehaviorSubject } from 'rxjs';

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
  countryCities: BehaviorSubject<
    { id: string; name: string; country_id?: number }[]
  > = new BehaviorSubject<{ id: string; name: string; country_id?: number }[]>(
    []
  );

  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Client';
  upaddingClientId?: number;
  newClientInputRows!: inputType[];
  clientCategories!: ClientCategory[];

  constructor(
    private clientsService: ClientsService,
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
    this.clients = resolvedData.clients;
    this.clientCategories = resolvedData.clientCategories;
    this.countries = resolvedData.countries;
    this.countryCities.subscribe((cities) => {
      const cityInput = this.newClientInputRows
        ? this.newClientInputRows.find(
            (input) => input.backed_key === 'city_id'
          )
        : '';
      if (cityInput) {
        cityInput.options = cities.map((city) => ({
          id: city.id,
          value: city.name,
        }));
        cityInput.disabled = cities.length === 0;
        // cityInput.value = '';
      }
    });
  }

  addNewClient(newClient: Clients) {
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
  checkChangedInput(changedInput: { key: string; value: string }) {
    if (changedInput.key === 'country_id' && changedInput.value) {
      this.countryService.getCountryCities(+changedInput.value).subscribe({
        next: (cities) => {
          this.countryCities.next(cities);
        },
        error: (err) => {
          console.error('Error fetching cities:', err);
        },
      });
    }
  }

  toggleFormVisibility = (clientId?: number) => {
    this.upaddingClientId = clientId;
    const targetClient = this.clients?.find(
      (clients) => clients.id === clientId
    );
    if (clientId && targetClient) {
      this.formHeader = 'Update Client';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add New Client';
      this.formType = 'Add';
      this.countryCities.next([]);
    }
    this.newClientInputRows = [
      {
        backed_key: 'name',
        title: 'Client Name',
        type: 'text',
        value: targetClient ? targetClient.name : undefined,
      },
      {
        backed_key: 'country_id',
        title: 'Country',
        type: 'select',
        options: this.countries?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetClient ? '' + targetClient.country_id : undefined,
      },
      {
        backed_key: 'city_id',
        title: 'City',
        type: 'select',
        options: this.countryCities.getValue().map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        disabled: this.countryCities.getValue().length === 0,
        value: targetClient ? '' + targetClient.city_id : undefined,
      },
      {
        backed_key: 'client_category',
        title: 'Client Category',
        type: 'select',
        options: this.clientCategories?.map((item) => {
          return { id: '' + item.id, value: item.category_name };
        }),
        value: targetClient ? '' + targetClient.state_id : undefined,
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
        value: targetClient ? targetClient.role : undefined,
      },
      {
        backed_key: 'mobile',
        title: 'Mobile',
        type: 'text',
        value: targetClient ? targetClient.mobile : undefined,
      },
      {
        backed_key: 'email',
        title: 'Email',
        type: 'email',
        value: targetClient ? targetClient.email : undefined,
      },
      {
        backed_key: 'gender',
        title: 'Gender',
        type: 'select',
        options: [
          { id: '0', value: 'Male' },
          { id: '1', value: 'Female' },
        ],
        value: targetClient ? targetClient.gender : undefined,
      },
      {
        backed_key: 'address',
        title: 'Address',
        type: 'text',
        value: targetClient ? targetClient.address : undefined,
      },
      {
        backed_key: 'description',
        title: 'Description',
        type: 'text',
        value: targetClient ? targetClient.description : undefined,
      },
    ];

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
      event.target.value = '';
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(clientId);
      event.target.value = '';
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
