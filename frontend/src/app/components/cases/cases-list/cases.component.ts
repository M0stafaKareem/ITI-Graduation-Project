import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CaseComponent } from '../case/case.component';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../../shared/services/cases.service';
import { ClientComponent } from '../../clients/client/client.component';
import { Case } from '../../../shared/models/case.model';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { CaseGrade } from '../../../shared/models/case.grade.model';
import { Clients } from '../../../shared/models/clients.model';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { LoadingScreenComponent } from '../../../shared/loading-screen/loading-screen.component';
import { Court } from '../../../shared/models/court.model';
import { Lawyers } from '../../../shared/models/lawyers.model';

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
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css', 'cases.component.scss'],
})
export class CasesComponent implements OnInit {
  cases?: Array<Case>;
  paginatedCases?: Array<Case>;
  categories?: Array<CaseCategory>;
  grades?: Array<CaseGrade>;
  clients?: Array<Clients>;
  client!: Clients;
  courts?: Array<Court>;
  lawyers?: Array<Lawyers>;
  oppositeLawyers?: Array<Lawyers>;
  loading: boolean = false;
  isFormVisable: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Case';
  upaddingCaseId?: number;
  newCasesInputRows!: inputType[];
  pageSize: number = 5;
  currentPage: number = 0;
  form!: FormGroup;
  @ViewChild('paginatorContainer') paginatorContainer!: ElementRef;
  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.route.data.subscribe((resolvedData) => {
      this.loadResolvedData(resolvedData);
    });
  }

  loadResolvedData(resolvedData: any) {
    resolvedData = resolvedData.data;
    this.cases = resolvedData.cases || [];
    this.categories = resolvedData.categories || [];
    this.grades = resolvedData.grades || [];
    this.clients = resolvedData.clients || [];
    this.courts = resolvedData.courts || [];
    this.lawyers = resolvedData.lawyers || [];
    this.oppositeLawyers = resolvedData.oppositeLawyers || [];
    this.updatePaginatedCases();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedCases();
  }
  updatePaginatedCases(): void {
    if (this.cases) {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedCases = this.cases.slice(start, end);
    }
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
    this.form = this.fb.group({
      case_name: [targetCase?.case_name || '', Validators.required],
      case_date: [targetCase?.case_date || '', Validators.required],
      first_session_date: [
        targetCase?.first_session_date || '',
        Validators.required,
      ],
      case_category_id: [
        targetCase?.case_category_id || '',
        Validators.required,
      ],
      status: [targetCase?.status || '', Validators.required],
      case_grade_id: [targetCase?.case_grade_id || '', Validators.required],
      client_id: [targetCase?.client_id || '', Validators.required],
      lawyer_id: [targetCase?.lawyer_id || '', Validators.required],
      opposing_lawyer_id: [
        targetCase?.opposing_lawyer_id || '',
        Validators.required,
      ],
      court_id: [targetCase?.court_id || '', Validators.required],
    });
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
        backed_key: 'status',
        title: 'Case Status',
        type: 'select',
        options: ['running', 'waiting', 'closed']?.map((item) => {
          return { id: item, value: item };
        }),
        value: targetCase ? '' + targetCase.status : undefined,
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
        backed_key: 'lawyer_id',
        title: 'Lawyer Name',
        type: 'select',
        options: this.oppositeLawyers?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.lawyer_id : undefined,
      },
      {
        backed_key: 'opposing_lawyer_id',
        title: 'Opposite Lawyer Name',
        type: 'select',
        options: this.oppositeLawyers?.map((item) => {
          return { id: '' + item.id, value: item.name };
        }),
        value: targetCase ? '' + targetCase.opposing_lawyer_id : undefined,
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
    this.clients?.forEach((item) => {
      if (item.id == caseData.client_id)
        caseData = { ...caseData, client: item };
    });
    this.courts?.forEach((item) => {
      if (item.id == caseData.client_id)
        caseData = { ...caseData, court: item };
    });

    if (this.formType === 'Add') {
      if (this.form.valid) {
        this.addNewCase(caseData).then((result) => {
          if (result) {
            this.cases?.push(caseData);
          }
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    } else if (this.formType === 'Update') {
      if (this.form.valid) {
        await this.updateCase(this.upaddingCaseId!, caseData).then((result) => {
          if (result) {
            this.cases = this.cases?.map((item) => {
              if (item.id == this.upaddingCaseId) {
                return caseData;
              }
              return item;
            });
            window.location.reload();
          }
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    }
    this.toggleFormVisibility();
  };

  handleSearch(searchTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  addNewCase(newCase: any) {
    return new Promise((resolve) => {
      this.caseService.insertCase(newCase).subscribe({
        next: (data) => {
          this.toaster.success(data.message);
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
          resolve(false);
        },
      });
    });
  }

  updateCase(caseId: number, updatedCase: any) {
    return new Promise((resolve) => {
      this.caseService.updateCase(caseId, updatedCase).subscribe({
        next: (data) => {
          this.toaster.success(data.message);
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
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
    } else if (selectedValue === 'View') {
      this.router.navigate(['cases', caseId]);
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
          this.toaster.success('Case deleted successfully');
          this.loading = false;
        },
        error: (error) => {
          this.toaster.error('Error deleting case:', error.error.message);
          this.loading = false;
        },
      });
    }
  }
}
