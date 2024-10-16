import { Component } from '@angular/core';
import { MailComponent } from './mail/mail.component';
import { CommonModule } from '@angular/common';
import { ConfirmApplicationService } from './confirm-application.service';

export interface Mail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [MailComponent, CommonModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent {
  constructor(private mailService: ConfirmApplicationService) {}

  mails: Mail[] = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Meeting Reminder',
      message: 'Just a reminder about our meeting tomorrow at 10 AM.',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      subject: 'Project Update',
      message: 'The project is on track for delivery next week.',
    },
  ];

  ngOnInit() {
    this.mailService.getAllApplications().subscribe({
      next: (applications) => {
        this.mails = applications;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      },
    });
  }

  toggleResponseForm() {}
}
