import { Component } from '@angular/core';
import { ClientCategory } from '../../../shared/models/client.category';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { ClientsService } from '../../../shared/services/clients.service';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-client-category',
  standalone: true,
  imports: [TableComponent, AddingFormComponent, SecondaryNavComponent, NgIf],
  templateUrl: './client-category.component.html',
  styleUrls: [
    './client-category.component.css',
    '../../cases/cases.component.css',
  ],
})
export class ClientCategoryComponent {
  categories?: ClientCategory[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingClientId?: number;
  newCategoryInputRows!: inputType[];

  constructor(private clientSerivce: ClientsService) {}

  ngOnInit(): void {
    this.getClientCategories();
  }

  addNewCategory(newCategory: ClientCategory): void {
    this.clientSerivce.insertCategory(newCategory).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateCategory(categoryId: number, updatedCategory: ClientCategory): void {
    this.clientSerivce.updateCategory(categoryId, updatedCategory).subscribe({
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
        value: targetCategory ? targetCategory.category_name : undefined,
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
      category_name: data[0],
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

  getClientCategories(): void {
    this.clientSerivce.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (error) => console.error('Error retrieving categories:', error),
    });
  }

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
      this.clientSerivce.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories?.filter(
            (category: ClientCategory) => category.id !== categoryId
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
