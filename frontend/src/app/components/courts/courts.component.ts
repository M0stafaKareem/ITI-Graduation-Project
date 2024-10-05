import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Court } from '../../shared/models/court.model';
import { TableComponent } from '../../shared/table/table.component';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { AddingFormComponent } from '../../shared/adding-form/adding-form.component';
import { NgIf } from '@angular/common';
import { CourtService } from '../../shared/services/court.service';
import { ToastrService } from 'ngx-toastr';
import { inputType } from '../../shared/adding-form/adding-form.component';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [TableComponent,
    SecondaryNavComponent,
    AddingFormComponent,
    NgIf,
    RouterLink,
    CommonModule
  ],
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css', '../cases/cases.component.css'],
})
export class CourtsComponent {
checkChangedInput($event: any) {
throw new Error('Method not implemented.');
}
  courts?: Court[];
  formType: any;
  formHeader: any;
  newCourtInputRows: any;
  isFormVisible: boolean = false;
  loading = false;
  upaddingCourtId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courtService: CourtService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['data'];
    this.courts = resolvedData?.courts || [];
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.fetchCourts(searchTerm);
    })
  }

  // Function to fetch clients based on the search term
  fetchCourts(searchTerm: string) {
    this.courtService.getCourts(searchTerm).subscribe((courts) => {
      this.courts = courts;
    });
  }
  
  handleSearch(searchTerm: string) {
    // Update query params with search term
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm }, // Update search query param
      queryParamsHandling: 'merge', // Merge with other query params
    });
  }

  toggleFormVisibility = (courtId?: number) => {
    this.upaddingCourtId = courtId;
    const targetCourt = this.courts?.find((court) => court.id === courtId);
    if (targetCourt && courtId) {
      this.formHeader = 'Update Court';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add Court';
      this.formType = 'Add';
    }
    this.newCourtInputRows = [
      {
        backed_key: 'name',
        title: 'Court Name',
        type: 'text',
        value: targetCourt ? targetCourt.name : undefined,
      },
      {
        backed_key: 'location',
        title: 'Location',
        type: 'text',
        value: targetCourt ? targetCourt.location : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (courtData: Court) => {
    if (this.formType === 'Add') {
      this.addNewCourt(courtData).then((result) => {
        if (result) {
          this.courts?.push(courtData);
        } else {
          console.log('failed to add Court');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateCourt(this.upaddingCourtId!, courtData).then(
        (result) => {
          if (result) {
            this.courts = this.courts?.map((item) => {
              if (item.id == this.upaddingCourtId) {
                console.log(courtData);
                return courtData;
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

  addNewCourt(newCourt: Court) {
    return new Promise((resolve) => {
      this.courtService.insertCourt(newCourt).subscribe({
        next: (data) => {
          this.toaster.success('Court added successfully');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
          resolve(false);
        },
      });
    });
  }

  updateCourt(courtId: number, updatedCourt: Court) {
    return new Promise((resolve) => {
      this.courtService.updateCourt(courtId, updatedCourt).subscribe({
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

  onActionSelect(event: any, courtId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteCourt(courtId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(courtId);
    }
    event.target.value = '';
  }

  deleteCourt(courtId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.courtService.deleteCourt(courtId).subscribe({
        next: () => {
          console.log('deleting');

          this.courts = this.courts?.filter(
            (court: Court) => court.id !== courtId
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
