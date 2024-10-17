import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmApplicationService } from './confirm-application.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

export interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent {
  constructor(
    private mailService: ConfirmApplicationService,
    private toaster: ToastrService
  ) {}

  mails: Mail[] = [];
  enteredResponce: string[] = [];
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

  respondToMessage(email: string, message: string): void {
    this.mailService.sendResponse({ email, message }).subscribe({
      next: () => {
        this.toaster.success('Response sent successfully');
        this.enteredResponce = [];
      },
      error: (error) => {
        this.toaster.error('Failed to send response');
      },
    });
  }
  deleteMail(applicationId: string) {
    this.mailService.deleteApplication(applicationId).subscribe({
      next: () => {
        this.toaster.success('Application deleted successfully');
        this.mails = this.mails.filter((mail) => mail.id !== applicationId);
      },
      error: (error) => {
        this.toaster.error('Failed to delete application');
      },
    });
  }
}
