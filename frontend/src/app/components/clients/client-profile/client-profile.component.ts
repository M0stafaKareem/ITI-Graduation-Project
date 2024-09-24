import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from '../../../shared/models/clients.model';
import { ClientsService } from '../../../shared/services/clients.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
})
export class ClientProfileComponent {
  clientId?: number;
  client?: Clients;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];
  }
}
