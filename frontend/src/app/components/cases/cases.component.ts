import { Component, OnInit } from '@angular/core';
import { CaseComponent } from './case/case.component';
import { TableComponent } from '../../shared/table/table.component';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../shared/services/cases.service';
import { NgFor, NgIf } from '@angular/common';
import { ClientComponent } from '../clients/client/client.component';
import { Case } from '../../shared/models/case.model';
import { CaseCategory } from '../../shared/models/case.category.model';
import { CaseGrade } from '../../shared/models/case.grade.model';
import { Clients } from '../../shared/models/clients.model';
import {
  inputType,
  AddingFormComponent,
} from '../../shared/adding-form/adding-form.component';
import { LoadingScreenComponent } from '../../shared/loading-screen/loading-screen.component';
import { ActivatedRoute } from '@angular/router';
import { Court } from '../../shared/models/court.model';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [
    CaseComponent,
    TableComponent,
    SecondaryNavComponent,
    NgFor,
    ClientComponent,
    NgIf,
    AddingFormComponent,
    LoadingScreenComponent,
  ],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent implements OnInit {
  cases?: Array<Case>;
  categories?: Array<CaseCategory>;
  grades?: Array<CaseGrade>;
  clients?: Array<Clients>;
  client!: Clients;
  courts?: Array<Court>;
  loading: boolean = false;
  isFormVisable: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Case';
  upaddingCaseId?: number;
  newCasesInputRows!: inputType[];

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const resolvedData = this.route.snapshot.data['data'];
    this.cases = resolvedData.cases;
    this.categories = resolvedData.categories;
    this.grades = resolvedData.grades;
    this.clients = resolvedData.clients;
    this.courts = resolvedData.courts;
    console.log(this.cases);
  }

  toggleFormVisibility = (caseId?: number): void => {
    this.upaddingCaseId = caseId;
    const targetCase = this.cases?.find((clients) => clients.id === caseId);
    if (targetCase) {
      this.formHeader = 'Update Case';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add New Case';
      this.formType = 'Add';
    }
    this.newCasesInputRows = [
      {
        backed_key: 'case_name',
        title: 'Case Name',
        type: 'text',
        value: targetCase ? targetCase.case_name : undefined,
      },
      {
        backed_key: 'case_date',
        title: 'Case Date',
        type: 'date',
        value: targetCase ? targetCase.case_date : undefined,
      },
      {
        backed_key: 'first_session_date',
        title: 'First Session Date',
        type: 'date',
        value: targetCase ? targetCase.first_session_date : undefined,
      },
      {
        backed_key: 'case_category_id',
        title: 'Case Category',
        type: 'select',
        options: this.categories?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.case_category_id : undefined,
      },
      {
        backed_key: 'case_grade_id',
        title: 'Case Grade',
        type: 'select',
        options: this.grades?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.case_grade_id : undefined,
      },
      {
        backed_key: 'client_id',
        title: 'Client Name',
        type: 'select',
        options: this.clients?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.client_id : undefined,
      },
      {
        backed_key: 'court_id',
        title: 'Court',
        type: 'select',
        options: this.courts?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.court_id : undefined,
      },
    ];

    this.isFormVisable = !this.isFormVisable;
  };

  submitForm = async (caseData: Case) => {
    if (this.formType === 'Add') {
      this.addNewCase(caseData).then((result) => {
        if (result) {
          this.cases?.push(caseData);
        } else {
          console.log('failed to add case');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateCase(this.upaddingCaseId!, caseData).then((result) => {
        if (result) {
          this.cases = this.cases?.map((item) => {
            if (item.id == this.upaddingCaseId) {
              console.log(caseData);
              return caseData;
            }
            return item;
          });
        } else {
          console.log('failed to update case');
        }
      });
    }
    this.toggleFormVisibility();
  };

  addNewCase(newCase: any) {
    return new Promise((resolve) => {
      this.caseService.insertCase(newCase).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(false);
        },
      });
    });
  }

  updateCase(caseId: number, updatedCase: any) {
    return new Promise((resolve) => {
      this.caseService.updateCase(caseId, updatedCase).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(false);
        },
      });
    });
  }

  onActionSelect(event: any, caseId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCase(caseId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(caseId);
    }
    event.target.value = '';
  }

  deleteCase(caseId: number): void {
    if (confirm('Are you sure you want to delete this case?')) {
      this.loading = true;
      this.caseService.deleteCase(caseId).subscribe({
        next: () => {
          this.cases = this.cases?.filter(
            (caseItem: Case) => caseItem.id !== caseId
          );

          this.loading = false;
        },
        error: (error) => {
          console.error('Error deleting case:', error);
          this.loading = false;
        },
      });
    }
  }
}
