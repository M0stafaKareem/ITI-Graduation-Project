import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from './inbox.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmApplicationService {
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  api = 'http://localhost:8000/api/Guest-Application';

  getAllApplications() {
    this.spinner.show();
    return this.http
      .get<Mail[]>(this.api)
      .pipe(finalize(() => this.spinner.hide()));
  }

  deleteApplication(applicationId: string) {
    this.spinner.show();
    return this.http
      .delete(`${this.api}/${applicationId}`)
      .pipe(finalize(() => this.spinner.hide()));
  }
  sendResponse(mailData: { email: string; message: string }) {
    this.toaster.show();
    return this.http
      .post('http://127.0.0.1:8000/api/confirm-application', mailData)
      .pipe(finalize(() => this.spinner.hide));
  }
}
