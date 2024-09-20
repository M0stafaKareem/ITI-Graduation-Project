import { Component, OnInit } from '@angular/core';

import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { TableComponent } from '../../shared/table/table.component';
import { ClientsService } from '../../shared/services/clients.service';
import { Clients } from '../../shared/models/clients.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SecondaryNavComponent, TableComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css', '../cases/cases.component.css'],
})
export class ClientsComponent implements OnInit {
  clients?: Array<Clients>;
  loading: boolean = false;

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.getClients();
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
