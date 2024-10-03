import { Component, OnInit } from '@angular/core';
import { Lawyers } from '../../../shared/models/lawyers.model';
import { ActivatedRoute } from '@angular/router';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import {
  AddingFormComponent,
  inputType,
} from '../../../shared/adding-form/adding-form.component';
import { TableComponent } from '../../../shared/table/table.component';
import { LawyersService } from '../../../shared/services/lawyers.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lawyers',
  standalone: true,
  imports: [SecondaryNavComponent, AddingFormComponent, TableComponent, NgIf],
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css', '../../cases/cases.component.css'],
})
export class LawyersComponent implements OnInit {
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingLawyerId?: number;
  newLawyerInputRows!: inputType[];
  lawyers!: Lawyers[];
  constructor(
    private route: ActivatedRoute,
    private lawyerService: LawyersService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.lawyers = this.route.snapshot.data['lawyers'];
    console.log(this.lawyers);
  }

  addNewLawyer(newLawyer: Lawyers) {
    return new Promise((resolve) => {
      this.lawyerService.insertLawyer(newLawyer).subscribe({
        next: (data) => {
          this.toaster.success('Lawyer added successfully');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error!');
          resolve(true);
        },
      });
    });
  }

  updateLawyer(lawyerId: number, updatedLawyer: Lawyers) {
    return new Promise((resolve) => {
      this.lawyerService.updateLawyer(lawyerId, updatedLawyer).subscribe({
        next: (data) => {
          this.toaster.success('Lawyer updated successfully');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error!');
          resolve(false);
        },
      });
    });
  }

  toggleFormVisibility = (lawyerId?: number) => {
    this.upaddingLawyerId = lawyerId;
    const targetLawyer = this.lawyers?.find((lawyer) => lawyer.id === lawyerId);
    if (targetLawyer && lawyerId) {
      this.formHeader = 'Update Lawyer';
      this.formType = 'Update';
    } else {
      this.formHeader = 'Add Lawyer';
      this.formType = 'Add';
    }
    this.newLawyerInputRows = [
      {
        backed_key: 'name',
        title: 'Lawyer Name',
        type: 'text',
        value: targetLawyer ? targetLawyer.name : undefined,
      },
      {
        backed_key: 'phone_number',
        title: 'Mobile Number',
        type: 'text',
        value: targetLawyer ? targetLawyer.phone_number : undefined,
      },
      {
        backed_key: 'address',
        title: 'Address',
        type: 'text',
        value: targetLawyer ? targetLawyer.address : undefined,
      },
      {
        backed_key: 'nation_id',
        title: 'Nationality ID',
        type: 'text',
        value: targetLawyer ? targetLawyer.nation_id : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (lawyerData: Lawyers) => {
    if (this.formType === 'Add') {
      this.addNewLawyer(lawyerData).then((result) => {
        if (result) {
          this.lawyers?.push(lawyerData);
        } else {
          console.log('failed to add Category');
        }
      });
    } else if (this.formType === 'Update') {
      await this.updateLawyer(this.upaddingLawyerId!, lawyerData).then(
        (result) => {
          if (result) {
            this.lawyers = this.lawyers?.map((item) => {
              if (item.id == this.upaddingLawyerId) {
                console.log(lawyerData);
                return lawyerData;
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

  onActionSelect(event: any, lawyerId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteLawyer(lawyerId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(lawyerId);
    }
    event.target.value = '';
  }

  deleteLawyer(lawyerId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.lawyerService.deleteLawyer(lawyerId).subscribe({
        next: () => {
          console.log('deleting');

          this.lawyers = this.lawyers?.filter(
            (lawyer: Lawyers) => lawyer.id !== lawyerId
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
