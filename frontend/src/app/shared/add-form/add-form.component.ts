import { Component } from '@angular/core';
import { LabelInputComponent } from './label-input/label-input.component';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [LabelInputComponent],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent {}
