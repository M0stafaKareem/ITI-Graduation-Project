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
  upaddingCategoryId?: number;
  newCategoryInputRows!: inputType[];

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'];
  }

  addNewCategory(newCategory: CaseCategory) {
    return new Promise((resolve) => {
      this.caseService.insertCategory(newCategory).subscribe({
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

  updateCategory(categoryId: number, updatedCategory: CaseCategory) {
    return new Promise((resolve) => {
      this.caseService.updateCategory(categoryId, updatedCategory).subscribe({
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

  toggleFormVisibility = (categoryId?: number) => {
    this.upaddingCategoryId = categoryId;
    const targetCategory = this.categories?.find(
      (category) => category.id === categoryId
    );
    if (targetCategory && categoryId) {
      this.formHeader = 'Update Category';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add Category';
      this.formType = 'Add';
    }
    this.newCategoryInputRows = [
      {
        backed_key: 'name',
        title: 'Category Name',
        type: 'text',
        value: targetCategory ? targetCategory.name : undefined,
      },
      {
        backed_key: 'description',
        title: 'description',
        type: 'text',
        value: targetCategory ? targetCategory.description : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (categoryData: CaseCategory) => {
    if (this.formType === 'Add') {
      this.addNewCategory(categoryData).then((result) => {
        if (result) {
          this.categories?.push(categoryData);
        } else {
          console.log('failed to add Category');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateCategory(this.upaddingCategoryId!, categoryData).then(
        (result) => {
          if (result) {
            this.categories = this.categories?.map((item) => {
              if (item.id == this.upaddingCategoryId) {
                console.log(categoryData);
                return categoryData;
              }
              return item;
            });
          } else {
            console.log('failed to update client');
          }
        }
      );
    }
    this.toggleFormVisibility();
  };

  onActionSelect(event: any, categoryId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCategory(categoryId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(categoryId);
    }
    event.target.value = '';
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.caseService.deleteCategory(categoryId).subscribe({
        next: () => {
          console.log('deleting');

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
