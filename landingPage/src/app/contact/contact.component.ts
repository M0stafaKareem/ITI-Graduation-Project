import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private contactService: ContactService) {}

  enteredName: string = '';
  enteredEmail: string = '';
  enteredSubject: string = '';
  enteredMessage: string = '';

  submitHandler(event: Event): void {
    event.preventDefault();
    const application = {
      name: this.enteredName,
      email: this.enteredEmail,
      subject: this.enteredSubject,
      message: this.enteredMessage,
    };
    this.contactService.sendContactMessage(application).subscribe({
      next: () => {
        this.enteredName = '';
        this.enteredEmail = '';
        this.enteredSubject = '';
        this.enteredMessage = '';
        alert('Message sent successfully!');
      },
      error: (error) => {
        console.error('Error sending message:', error);
      },
    });
  }
}
