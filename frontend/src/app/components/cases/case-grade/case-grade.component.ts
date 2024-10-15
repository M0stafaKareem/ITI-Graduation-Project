import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../../shared/services/cases.service';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { CaseGrade } from '../../../shared/models/case.grade.model';

@Component({
  selector: 'app-case-grade',
  standalone: true,
  imports: [
    TableComponent,
    SecondaryNavComponent,
    NgIf,
    AddingFormComponent,
    CommonModule,
    RouterLink,
    MatPaginator,
  ],
  templateUrl: './case-grade.component.html',
  styleUrls: [
    './case-grade.component.css',
    '../cases-list/cases.component.css',
  ],
})
export class CaseGradeComponent implements OnInit {
  checkChangedInput($event: any) {
    throw new Error('Function not implemented.');
  }
  grades?: CaseGrade[];
  paginatedGrades?: CaseGrade[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Grade';
  upaddingGradeId?: number;
  newGradeInputRows!: inputType[];
  form!: FormGroup;
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    const resolveData = this.route.snapshot.data['data'];
    this.grades = resolveData?.grades || [];
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.fetchGrades(searchTerm);
    });
    this.grades = this.route.snapshot.data['grades'];
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedGrades();
  }
  updatePaginatedGrades(): void {
    if (this.grades) {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedGrades = this.grades.slice(start, end);
    }
  }

  fetchGrades(searchTerm: string) {
    this.caseService.getCaseGrade(searchTerm).subscribe((grades) => {
      this.grades = grades;
      this.updatePaginatedGrades();
    });
  }

  handleSearch(searchTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }
  addNewGrade(newGrade: CaseGrade) {
    return new Promise((resolve) => {
      this.caseService.insertCaseGrade(newGrade).subscribe({
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

  updateGrade(gradeId: number, updatedGrade: CaseGrade) {
    return new Promise((resolve) => {
      this.caseService.updateCaseGrade(gradeId, updatedGrade).subscribe({
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

  validations(targetGrade?: CaseGrade) {
    this.form = this.fb.group({
      name: [targetGrade?.name || '', Validators.required],
      description: [targetGrade?.description || '', Validators.required],
    });
  }

  toggleFormVisibility = (gradeId?: number) => {
    this.upaddingGradeId = gradeId;
    const targetGrade = this.grades?.find((item) => item.id === gradeId);
    if (targetGrade && gradeId) {
      this.formHeader = 'Update Grade';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add Grade';
      this.formType = 'Add';
    }
    this.validations(targetGrade);
    this.newGradeInputRows = [
      {
        backed_key: 'name',
        title: 'Grade',
        type: 'text',
        value: targetGrade ? targetGrade.name : undefined,
      },
      {
        backed_key: 'description',
        title: 'description',
        type: 'text',
        value: targetGrade ? targetGrade.description : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (gradeData: CaseGrade) => {
    if (this.formType === 'Add') {
      if (this.form.valid) {
        this.addNewGrade(gradeData).then((result) => {
          if (result) {
            this.grades?.push(gradeData);
          } else {
            console.log('failed to add Grade');
          }
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    } else if (this.formType === 'Update') {
      if (this.form.valid) {
        await this.updateGrade(this.upaddingGradeId!, gradeData).then(
          (result) => {
            if (result) {
              this.paginatedGrades = this.paginatedGrades?.map((item) => {
                if (item.id == this.upaddingGradeId) {
                  console.log(gradeData);
                  return gradeData;
                }
                return item;
              });
            } else {
              console.log('failed to update Grade');
            }
          }
        );
      } else {
        this.form.markAllAsTouched();
        return;
      }
    }
    this.toggleFormVisibility();
  };

  onActionSelect(event: any, gradeId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteGrade(gradeId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(gradeId);
    }
    event.target.value = '';
  }

  deleteGrade(gradeId: number): void {
    if (confirm('Are you sure you want to delete this Grade?')) {
      this.loading = true;
      this.caseService.deleteCaseGrade(gradeId).subscribe({
        next: () => {
          console.log('deleting');

          this.grades = this.grades?.filter(
            (item: CaseGrade) => item.id !== gradeId
          );

          this.loading = false;
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error deleting Case Grade:');
          this.loading = false;
        },
      });
    }
  }
}
