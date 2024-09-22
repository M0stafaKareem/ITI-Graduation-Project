import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent {
  cases?: Array<Case>;
  categories?: Array<CaseCategory>;
  grades?: Array<CaseGrade>;
  clients?: Array<Clients>;
  client!: Clients;
  loading: boolean = false;
  isFormVisable: boolean = false;
  constructor(
    private caseService: CasesService,
    private clientService: ClientsService
  ) {}

  newCasesInputRows!: inputType[];

  toggleFormVisibility() {
    this.isFormVisable = !this.isFormVisable;
  }

  submitForm = (data: any) => {
    this.addNewCase({
      case_name: data[0],
      case_date: data[1],
      first_session_date: data[2],
      case_category_id: data[3],
      case_grade_id: data[4],
      client_id: data[5],
    });
    this.toggleFormVisibility();
  };

  ngOnInit() {
    this.loadCases();
    this.loadCategories();
    this.getCaseGrade();
    this.getClient();
  }

  ngDoCheck() {
    this.newCasesInputRows = [
      { id: '1', title: 'Case Name', type: 'text' },
      { id: '2', title: 'Case Date', type: 'date' },
      { id: '3', title: 'First Session Date', type: 'date' },
      {
        id: '4',
        title: 'Case Category',
        type: 'select',
        options: this.categories?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
      },
      {
        id: '5',
        title: 'Case Grade',
        type: 'select',
        options: this.grades?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
      },
      {
        id: '6',
        title: 'Client Name',
        type: 'select',
        options: this.clients?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
      },
    ];
  }

  addNewCase(newCase: any): void {
    this.caseService.insertCase(newCase).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }
  loadCases(): void {
    this.caseService.getCases().subscribe({
      next: (data) => {
        this.cases = data;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  loadCategories(): void {
    this.caseService.getCategories().subscribe({
      next: (categoriesData) => {
        this.categories = categoriesData;
        this.cases = this.cases?.map((caseItem: Case) => ({
          ...caseItem,
          categoryName:
            this.categories?.find(
              (cat: CaseCategory) => cat.id === caseItem.case_category_id
            )?.name || 'No Category',
        }));
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getCaseGrade(): void {
    this.caseService.getCaseGrade().subscribe({
      next: (gradeData) => {
        this.grades = gradeData;
        this.cases = this.cases?.map((caseItem: Case) => ({
          ...caseItem,
          case_grade:
            this.grades?.find(
              (grade: CaseGrade) => grade.id === caseItem.case_grade_id
            )?.name || 'No Grade',
        }));
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getClient(): void {
    this.clientService.getClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData;
        this.cases = this.cases?.map((caseItem: Case) => {
          const foundClient = this.clients?.find(
            (client: Clients) => client.id === caseItem.client_id
          );

          return {
            ...caseItem,
            client: foundClient,
          };
        });
      },
      error: (error) => console.error('Error:', error),
    });
  }

  onActionSelect(event: any, caseId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCase(caseId);
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
