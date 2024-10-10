import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from '../../../shared/models/clients.model';
import { RowInfoComponent } from '../../../shared/single-page-details/row-info/row-info.component';
import { ClientsService } from '../../../shared/services/clients.service';
import { SinglePageDetailsComponent } from '../../../shared/single-page-details/single-page-details.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [SinglePageDetailsComponent, RowInfoComponent],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
})
export class ClientProfileComponent {
  clientId?: number;
  client?: Clients;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
    console.log(this.client);
  }
}
