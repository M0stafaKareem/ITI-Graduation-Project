import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { CasesService } from '../../../shared/services/cases.service';
import { CaseCategory } from '../../../shared/models/case.category.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-case-category',
  standalone: true,
  imports: [TableComponent, SecondaryNavComponent, NgIf],
  templateUrl: './case-category.component.html',
  styleUrls: ['./case-category.component.css', '../cases.component.css'],
})
export class CaseCategoryComponent implements OnInit {
  categories?: CaseCategory[];
  loading: boolean = false;
  constructor(private caseService: CasesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.caseService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (error) => console.error('Error retrieving categories:', error),
    });
  }

  onActionSelect(event: any, categoryId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCategory(categoryId);
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
