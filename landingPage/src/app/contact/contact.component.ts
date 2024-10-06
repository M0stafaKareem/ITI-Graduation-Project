import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with validation
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    this.isSubmitted = true;

    // If the form is invalid, do not proceed
    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Clear previous errors
    this.successMessage = ''; // Clear previous success messages

    // Simulate form submission (you can replace this with an actual HTTP request)
    setTimeout(() => {
      this.isLoading = false;

      // Simulate success or error
      const isSuccess = Math.random() > 0.3; // Simulating a 70% success rate
      if (isSuccess) {
        this.successMessage = 'Your message has been sent. Thank you!';
        this.errorMessage = '';
        this.contactForm.reset(); // Reset the form after successful submission
        this.isSubmitted = false; // Reset form state
      } else {
        this.errorMessage = 'There was an error sending your message. Please try again later.';
        this.successMessage = '';
      }
    }, 2000);
  }

  // Convenience getter for easy access to form fields in the template
  get f() {
    return this.contactForm.controls;
  }
}