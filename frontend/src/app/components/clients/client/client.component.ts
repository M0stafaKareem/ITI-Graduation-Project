import { Component, Input } from '@angular/core';

@Component({
  selector: 'td [client-td]',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css', '../../cases/case/case.component.css'],
})
export class ClientComponent {
  @Input() clientName?: string;
  @Input() clientMobile: any;
  @Input() clientEmail: any;
  @Input() clientAddress: any;
}
