import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { ClientCategory } from '../../../shared/models/client.category';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { ClientsService } from '../../../shared/services/clients.service';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-category',
  standalone: true,
  imports: [TableComponent, AddingFormComponent, SecondaryNavComponent, NgIf, CommonModule, RouterLink],
  templateUrl: './client-category.component.html',
  styleUrls: [
    './client-category.component.css',
    '../../cases/cases.component.css',
  ],
})
export class ClientCategoryComponent {
checkChangedInput($event: any) {
throw new Error('Method not implemented.');
}
  categories?: ClientCategory[];
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingClientId?: number;
  newCategoryInputRows!: inputType[];

  constructor(
    private clientSerivce: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService

  ) {}

  ngOnInit(): void {
    const resolveData = this.route.snapshot.data['data'];
    this .categories = resolveData?.clientCategories || [];
    // subscribe to query param changes
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.fetchCategories(searchTerm);
    });
    this.categories = this.route.snapshot.data['clientCategories'];
  }

    // Function to fetch clients based on the search term
    fetchCategories(searchTerm: string) {
      this.clientSerivce.getCategories(searchTerm).subscribe((categories) => {
        this.categories = categories;
      }); 
    }

    handleSearch(searchTerm: string) {
      // Update query params to trigger resolver re-execution
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

  toggleFormVisibility = (categoryId?: number) => {
    this.upaddingClientId = categoryId;
    const targetCategory = this.categories?.find(
      (category) => category.id === categoryId
    );
    if (categoryId && targetCategory) {
      this.formHeader = 'Update Category';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add New Category';
      this.formType = 'Add';
    }
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
      this.addNewCategory(categoryData).then((result) => {
        if (result) {
          this.categories?.push({
            ...categoryData,
            id: this.categories.length,
          });
        } else {
          console.log('failed to add client');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateCategory(this.upaddingClientId!, categoryData).then(
        (result) => {
          if (result) {
            this.categories = this.categories?.map((category) => {
              if (category.id == this.upaddingClientId) {
                return {
                  ...category,
                  id: this.categories![this.categories!.length].id! + 1,
                };
              }
              return category;
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
