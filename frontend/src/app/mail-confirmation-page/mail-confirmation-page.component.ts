import { Component } from '@angular/core';

@Component({
  selector: 'app-mail-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './mail-confirmation-page.component.html',
  styleUrl: './mail-confirmation-page.component.css',
})
export class MailConfirmationPageComponent {
  isLoading: boolean = false;
  backendResponse: string = '';
}
