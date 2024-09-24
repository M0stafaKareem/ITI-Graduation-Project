import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'td [client-td]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css', '../../cases/case/case.component.css'],
})
export class ClientComponent {
  @Input() clientName?: string;
  @Input() clientMobile: any;
  @Input() clientEmail: any;
  @Input() clientAddress: any;
  @Input() userProfile: any;
}
