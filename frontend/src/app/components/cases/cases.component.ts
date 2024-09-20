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
  constructor(
    private caseService: CasesService,
    private clientService: ClientsService
  ) {}

  ngOnInit() {
    this.loadCases();
    this.loadCategories();
    this.getCaseGrade();
    this.getClient();
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
          console.log(foundClient);

          return {
            ...caseItem,
            client: foundClient,
          };
        });

        console.log(this.cases);
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
