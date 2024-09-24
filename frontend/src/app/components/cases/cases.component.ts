import { Component, OnInit } from '@angular/core';
import { CaseComponent } from './case/case.component';
import { TableComponent } from '../../shared/table/table.component';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../shared/services/cases.service';
import { NgFor, NgIf } from '@angular/common';
import { ClientsService } from '../../shared/services/clients.service';
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
  }

  toggleFormVisibility = (caseId?: number): void => {
    this.upaddingCaseId = caseId;
    const targetCase = this.cases?.find((clients) => clients.id === caseId);
    this.newCasesInputRows = [
      {
        id: '1',
        title: 'Case Name',
        type: 'text',
        value: targetCase ? targetCase.case_name : undefined,
      },
      {
        id: '2',
        title: 'Case Date',
        type: 'date',
        value: targetCase ? targetCase.case_date : undefined,
      },
      {
        id: '3',
        title: 'First Session Date',
        type: 'date',
        value: targetCase ? targetCase.first_session_date : undefined,
      },
      {
        id: '4',
        title: 'Case Category',
        type: 'select',
        options: this.categories?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.case_category_id : undefined,
      },
      {
        id: '5',
        title: 'Case Grade',
        type: 'select',
        options: this.grades?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.case_grade_id : undefined,
      },
      {
        id: '6',
        title: 'Client Name',
        type: 'select',
        options: this.clients?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.client_id : undefined,
      },
    ];
    if (targetCase) {
      this.formHeader = 'Update Client';
      this.formType = 'Update';
    }
    this.isFormVisable = !this.isFormVisable;
  };

  submitForm = (data: any) => {
    const caseData = {
      case_name: data[0],
      case_date: data[1],
      first_session_date: data[2],
      case_category_id: data[3],
      case_grade_id: data[4],
      client_id: data[5],
    };
    if (this.formType === 'Add') {
      this.addNewCase(caseData);
    } else if (this.formType === 'Update') {
      this.updateCase(this.upaddingCaseId!, caseData);
    }
    this.cases?.push(caseData);
    this.toggleFormVisibility();
  };

  addNewCase(newCase: any): void {
    this.caseService.insertCase(newCase).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateCase(caseId: number, updatedCase: any): void {
    this.caseService.updateCase(caseId, updatedCase).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  onActionSelect(event: any, caseId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCase(caseId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(caseId);
    }
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
