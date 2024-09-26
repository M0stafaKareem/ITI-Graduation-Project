import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Court } from '../../shared/models/court.model';
import { TableComponent } from '../../shared/table/table.component';
import { SecondaryNavComponent } from '../../shared/secondary-nav/secondary-nav.component';
import { AddingFormComponent } from '../../shared/adding-form/adding-form.component';
import { NgIf } from '@angular/common';
import { CourtService } from '../../shared/services/court.service';

@Component({
  selector: 'app-courts',
  standalone: true,
  imports: [TableComponent, SecondaryNavComponent, AddingFormComponent, NgIf],
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.css', '../cases/cases.component.css'],
})
export class CourtsComponent {
  courts?: Court[];
  formType: any;
  formHeader: any;
  newCourtInputRows: any;
  isFormVisible: boolean = false;
  loading = false;
  upaddingCourtId?: number;

  constructor(
    private route: ActivatedRoute,
    private courtService: CourtService
  ) {}
  ngOnInit(): void {
    this.courts = this.route.snapshot.data['courts'];
    console.log(this.courts);
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

  updateCourt(courtId: number, updatedCourt: Court) {
    return new Promise((resolve) => {
      this.courtService.updateCourt(courtId, updatedCourt).subscribe({
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
          console.error('Error deleting Category:', error);
          this.loading = false;
        },
      });
    }
  }
}
