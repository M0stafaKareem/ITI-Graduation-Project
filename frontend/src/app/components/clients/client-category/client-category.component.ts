import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ClientCategory } from '../../../shared/models/client.category';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { ClientsService } from '../../../shared/services/clients.service';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';

@Component({
  selector: 'app-client-category',
  standalone: true,
  imports: [
    TableComponent,
    AddingFormComponent,
    SecondaryNavComponent,
    NgIf,
    CommonModule,
    RouterLink,
    MatPaginator,
  ],
  templateUrl: './client-category.component.html',
  styleUrls: [
    './client-category.component.css',
    '../../cases/cases-list/cases.component.css',
  ],
})
export class ClientCategoryComponent {
  checkChangedInput($event: any) {
    throw new Error('Method not implemented.');
  }
  categories?: ClientCategory[];
  paginatedCategories?: ClientCategory[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingClientId?: number;
  newCategoryInputRows!: inputType[];
  form!: FormGroup;
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private clientSerivce: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    const resolveData = this.route.snapshot.data['data'];
    this.categories = resolveData?.clientCategories || [];
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.fetchCategories(searchTerm);
    });
    this.categories = this.route.snapshot.data['clientCategories'];
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedCategory();
  }
  updatePaginatedCategory(): void {
    if (this.categories) {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedCategories = this.categories.slice(start, end);
    }
  }

  fetchCategories(searchTerm: string) {
    this.clientSerivce.getCategories(searchTerm).subscribe((categories) => {
      this.categories = categories;
      this.updatePaginatedCategory();
    });
  }

  handleSearch(searchTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }
  addNewCategory(newCategory: ClientCategory) {
    return new Promise((resolve) => {
      this.clientSerivce.insertCategory(newCategory).subscribe({
        next: (data) => {
          this.toaster.success('Added new category', 'Success');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message);
          resolve(false);
        },
      });
    });
  }

  updateCategory(categoryId: number, updatedCategory: ClientCategory) {
    return new Promise((resolve) => {
      this.clientSerivce.updateCategory(categoryId, updatedCategory).subscribe({
        next: (data) => {
          console.log(data);
          return resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message);
          return resolve(false);
        },
      });
    });
  }

  validations(targetCategory?: ClientCategory) {
    this.form = this.fb.group({
      category_name: [targetCategory?.category_name || '', Validators.required],
      description: [targetCategory?.description || '', Validators.required],
    });
  }

  toggleFormVisibility = (categoryId?: number) => {
    this.upaddingClientId = categoryId;
    const targetCategory = this.paginatedCategories?.find(
      (category) => category.id === categoryId
    );
    if (categoryId && targetCategory) {
      this.formHeader = 'Update Category';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add New Category';
      this.formType = 'Add';
    }
    this.validations(targetCategory);
    this.newCategoryInputRows = [
      {
        backed_key: 'category_name',
        title: 'Category Name',
        type: 'text',
        value: targetCategory ? targetCategory.category_name : undefined,
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

  submitForm = async (categoryData: ClientCategory) => {
    if (this.formType === 'Add') {
      if (this.form.valid) {
        this.addNewCategory(categoryData).then((result) => {
          if (result) {
            this.categories?.push({
              ...categoryData,
              id: this.categories.length,
            });
          }
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    } else if (this.formType === 'Update') {
      if (this.form.valid) {
        await this.updateCategory(this.upaddingClientId!, categoryData).then(
          (result) => {
            if (result) {
              this.paginatedCategories = this.paginatedCategories?.map(
                (category) => {
                  if (category.id == this.upaddingClientId) {
                    console.log(categoryData);
                    return { ...categoryData, id: category.id };
                  }

                  return category;
                }
              );
            } else {
              console.log('failed to update client');
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
      this.clientSerivce.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories?.filter(
            (category: ClientCategory) => category.id !== categoryId
          );

          this.loading = false;
        },
        error: (error) => {
          this.toaster.error('Error deleting Category');
          this.loading = false;
        },
      });
    }
  }
}
