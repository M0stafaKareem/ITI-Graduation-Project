import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../../shared/services/cases.service';
import { NgIf } from '@angular/common';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { ActivatedRoute } from '@angular/router';
import { CaseGrade } from '../../../shared/models/case.grade.model';

@Component({
  selector: 'app-case-grade',
  standalone: true,
  imports: [TableComponent, SecondaryNavComponent, NgIf, AddingFormComponent],
  templateUrl: './case-grade.component.html',
  styleUrls: ['./case-grade.component.css', '../cases.component.css'],
})
export class CaseGradeComponent implements OnInit {
  grades?: CaseGrade[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Grade';
  upaddingGradeId?: number;
  newGradeInputRows!: inputType[];

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grades = this.route.snapshot.data['grades'];
  }

  addNewGrade(newGrade: CaseGrade) {
    return new Promise((resolve) => {
      this.caseService.insertCaseGrade(newGrade).subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(true);
        },
      });
    });
  }

  updateGrade(gradeId: number, updatedGrade: CaseGrade) {
    return new Promise((resolve) => {
      this.caseService.updateCaseGrade(gradeId, updatedGrade).subscribe({
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
      this.addNewGrade(gradeData).then((result) => {
        if (result) {
          this.grades?.push(gradeData);
        } else {
          console.log('failed to add Grade');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateGrade(this.upaddingGradeId!, gradeData).then(
        (result) => {
          if (result) {
            this.grades = this.grades?.map((item) => {
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
          console.error('Error deleting Case Grade:', error);
          this.loading = false;
        },
      });
    }
  }
}
