import { Component } from '@angular/core';
import { Case } from '../../../shared/models/case.model';
import { ActivatedRoute } from '@angular/router';
import { SinglePageDetailsComponent } from '../../../shared/single-page-details/single-page-details.component';
import { RowInfoComponent } from '../../../shared/single-page-details/row-info/row-info.component';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { Clients } from '../../../shared/models/clients.model';
import { Lawyers } from '../../../shared/models/lawyers.model';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import {
  AddingFormComponent,
  inputType,
} from '../../../shared/adding-form/adding-form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { Session } from '../../../shared/models/session.model';
import { NgIf } from '@angular/common';
import { CaseSessionService } from '../../../shared/services/case-session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [
    SinglePageDetailsComponent,
    RowInfoComponent,
    SecondaryNavComponent,
    AddingFormComponent,
    TableComponent,
    NgIf,
  ],
  templateUrl: './case-details.component.html',
  styleUrls: [
    './case-details.component.css',
    '../../../shared/single-page-details/single-page-details.component.css',
    '../cases.component.css',
  ],
})
export class CaseDetailsComponent {
  case?: Case;
  client?: Clients;
  category?: CaseCategory;
  lawyer?: Lawyers;
  oppositeLawyer?: Lawyers;
  sessions?: Session[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingSessionId?: number;
  newSessionInputRows!: inputType[];

  constructor(
    private route: ActivatedRoute,
    private caseSession: CaseSessionService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['case'];
    this.case = resolvedData.case;
    this.client = resolvedData.client;
    this.category = resolvedData.category;
    this.lawyer = resolvedData.lawyer;
    this.oppositeLawyer = resolvedData.oppositeLawyer;
    this.sessions = resolvedData.sessions;
    console.log(this.sessions);
  }
  addNewSession(newSession: Session) {
    return new Promise((resolve) => {
      this.caseSession.createSession(newSession).subscribe({
        next: (data) => {
          this.toaster.success('successfully added');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
          resolve(true);
        },
      });
    });
  }

  updateSession(sessionId: number, updatedSession: Session) {
    return new Promise((resolve) => {
      this.caseSession.updateSession(sessionId, updatedSession).subscribe({
        next: (data) => {
          this.toaster.success('successfully updated ');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
          resolve(false);
        },
      });
    });
  }

  toggleFormVisibility = (sessionId?: number) => {
    this.upaddingSessionId = sessionId;
    const targetSession = this.sessions?.find(
      (session) => session.id === sessionId
    );
    if (targetSession && sessionId) {
      this.formHeader = 'Update Session';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add Session';
      this.formType = 'Add';
    }
    this.newSessionInputRows = [
      {
        backed_key: 'id',
        title: 'Session Number',
        type: 'number',
        value: targetSession ? targetSession.session_number : undefined,
      },
      {
        backed_key: 'case_id',
        title: '',
        type: 'hidden',
        value: this.route.snapshot.params['id'] ?? undefined,
      },
      {
        backed_key: 'session_date',
        title: 'Date',
        type: 'date',
        value: targetSession ? targetSession.session_date : undefined,
      },
      {
        backed_key: 'happened',
        title: 'What Happened',
        type: 'text',
        value: targetSession ? targetSession.happened : undefined,
      },
      {
        backed_key: 'requirements',
        title: 'Requirements',
        type: 'text',
        value: targetSession ? targetSession.requirements : undefined,
      },
      {
        backed_key: 'court_decision',
        title: 'Court Decision',
        type: 'text',
        value: targetSession ? targetSession.court_decision : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (sessionData: Session) => {
    if (this.formType === 'Add') {
      this.addNewSession(sessionData).then((result) => {
        if (result) {
          this.sessions?.push(sessionData);
        } else {
          console.log('failed to add Category');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateSession(this.upaddingSessionId!, sessionData).then(
        (result) => {
          if (result) {
            this.sessions = this.sessions?.map((item) => {
              if (item.id == this.upaddingSessionId) {
                console.log(sessionData);
                return sessionData;
              }
              return item;
            });
          } else {
            console.log('failed to update session');
          }
        }
      );
    }
    this.toggleFormVisibility();
  };

  onActionSelect(event: any, sessionId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteSession(sessionId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(sessionId);
    }
    event.target.value = '';
  }

  deleteSession(sessionId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.caseSession.deleteSession(sessionId).subscribe({
        next: () => {
          console.log('deleting');

          this.sessions = this.sessions?.filter(
            (session: Session) => session.id !== sessionId
          );

          this.loading = false;
        },
        error: (error: any) => {
          this.toaster.error(error.error.message, 'Error');
          this.loading = false;
        },
      });
    }
  }
}
