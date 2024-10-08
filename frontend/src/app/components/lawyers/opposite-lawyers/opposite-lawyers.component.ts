import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import {
  inputType,
  AddingFormComponent,
} from '../../../shared/adding-form/adding-form.component';
import { CommonModule } from '@angular/common';
import { Lawyers } from '../../../shared/models/lawyers.model';
import { LawyersService } from '../../../shared/services/lawyers.service';
import { SecondaryNavComponent } from '../../../shared/secondary-nav/secondary-nav.component';
import { TableComponent } from '../../../shared/table/table.component';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-opposite-lawyers',
  standalone: true,
  imports: [
    SecondaryNavComponent,
    AddingFormComponent,
    TableComponent,
    NgIf,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './opposite-lawyers.component.html',
  styleUrls: [
    './opposite-lawyers.component.css',
    '../../cases/cases-list/cases.component.css',
  ],
})
export class OppositeLawyersComponent {
  checkChangedInput($event: any) {
    throw new Error('Method not implemented.');
  }
  loading: boolean = false;
  isFormVisible: boolean = false;
  formType: 'Add' | 'Update' = 'Add';
  formHeader: string = 'Add New Category';
  upaddingLawyerId?: number;
  newLawyerInputRows!: inputType[];
  lawyers!: Lawyers[];
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private oppositeLawyerService: LawyersService,
    private toaster: ToastrService,
    private router: Router,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    const resolverData = this.route.snapshot.data['data'];
    this.lawyers = resolverData?.oppositeLawyers || [];
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.fetchLawyers(searchTerm);
    });

    this.lawyers = this.route.snapshot.data['oppositeLawyers'];
  }

  fetchLawyers(searchTerm: string) {
    this.oppositeLawyerService
      .getOppositeLawyers(searchTerm)
      .subscribe((lawyers) => {
        this.lawyers = lawyers;
      });
  }

  handleSearch(searchTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }
  addNewOppositeLawyer(newLawyer: Lawyers) {
    return new Promise((resolve) => {
      this.oppositeLawyerService.insertOppositeLawyer(newLawyer).subscribe({
        next: (data) => {
          this.toaster.success(' Added Successfully!');
          resolve(true);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'Error');
          resolve(true);
        },
      });
    });
  }

  updateOppositeLawyer(lawyerId: number, updatedLawyer: Lawyers) {
    return new Promise((resolve) => {
      this.oppositeLawyerService
        .updateOppositeLawyer(lawyerId, updatedLawyer)
        .subscribe({
          next: (data) => {
            this.toaster.success('');
            resolve(true);
          },
          error: (error) => {
            this.toaster.error(error.error.message, 'Error');
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
    this.form = this.fb.group({
      name: [targetLawyer?.name || '', Validators.required],
      phone_number: [targetLawyer?.phone_number || '', Validators.required],
      address: [targetLawyer?.address || '', Validators.required],
      national_id: [targetLawyer?.national_id || '', Validators.required],
    });
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
        backed_key: 'national_id',
        title: 'Nationality ID',
        type: 'text',
        value: targetLawyer ? targetLawyer.national_id : undefined,
      },
    ];

    this.isFormVisible = !this.isFormVisible;
  };

  submitForm = async (lawyerData: Lawyers) => {
    if (this.formType === 'Add') {
      if(this.form.valid) {
        this.addNewOppositeLawyer(lawyerData).then((result) => {
          if (result) {
            this.lawyers?.push(lawyerData);
          } else {
            console.log('failed to add Category');
          }
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    } else if (this.formType === 'Update') {
      if(this.form.valid) {
        await this.updateOppositeLawyer(
          this.upaddingLawyerId!,
          lawyerData
        ).then((result) => {
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
        });
      } else {
        this.form.markAllAsTouched();
        return;
      }
    }
    this.toggleFormVisibility();
  };

  onActionSelect(event: any, lawyerId: number): void {
    const selectedValue = event.target.value;

    if (selectedValue === 'Delete') {
      this.deleteOppositeLawyer(lawyerId);
    } else if (selectedValue === 'Update') {
      this.toggleFormVisibility(lawyerId);
    }
    event.target.value = '';
  }

  deleteOppositeLawyer(lawyerId: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.loading = true;
      this.oppositeLawyerService.deleteOppositeLawyer(lawyerId).subscribe({
        next: () => {
          console.log('deleting');

          this.lawyers = this.lawyers?.filter(
            (lawyer: Lawyers) => lawyer.id !== lawyerId
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
