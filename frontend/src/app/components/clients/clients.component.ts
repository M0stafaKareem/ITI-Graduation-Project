import { Component } from '@angular/core';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SecondaryNavComponent, TableComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css', '../cases/cases.component.css'],
})
export class ClientsComponent {}
