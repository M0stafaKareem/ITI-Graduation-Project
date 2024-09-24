import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { NgIf } from '@angular/common';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-category',
  standalone: true,
  imports: [TableComponent, SecondaryNavComponent, NgIf, AddingFormComponent],
  templateUrl: './case-category.component.html',
  styleUrls: ['./case-category.component.css', '../cases.component.css'],
})
export class CaseCategoryComponent implements OnInit {
  categories?: CaseCategory[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingClientId?: number;
  newCategoryInputRows!: inputType[];

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
  }

  addNewCategory(newCategory: CaseCategory): void {
    this.caseService.insertCategory(newCategory).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateCategory(categoryId: number, updatedCategory: CaseCategory): void {
    this.caseService.updateCategory(categoryId, updatedCategory).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  toggleFormVisibility = (categoryId?: number) => {
    this.upaddingClientId = categoryId;
    const targetCategory = this.categories?.find(
      (category) => category.id === categoryId
    );
    this.newCategoryInputRows = [
      {
        id: '1',
        title: 'Category Name',
        type: 'text',
        value: targetCategory ? targetCategory.name : undefined,
      },
      {
        id: '2',
        title: 'description',
        type: 'text',
        value: targetCategory ? targetCategory.description : undefined,
      },
    ];
    if (targetCategory) {
      this.formHeader = 'Update Category';
      this.formType = 'Update';
    }
    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = (data: any) => {
    const categoryData = {
      name: data[0],
      description: data[1],
    };
    if (this.formType === 'Add') {
      this.addNewCategory(categoryData);
    } else if (this.formType === 'Update') {
      this.updateCategory(this.upaddingClientId!, categoryData);
    }
    this.categories?.push(categoryData);
    this.toggleFormVisibility();
  };

  onActionSelect(event: any, categoryId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCategory(categoryId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(categoryId);
    }
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.caseService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories?.filter(
            (category: CaseCategory) => category.id !== categoryId
          );

          this.loading = false;
        },
        error: (error) => {
          console.error('Error deleting Category:', error);
          this.loading = false;
        },
      });
    }
  }
}
