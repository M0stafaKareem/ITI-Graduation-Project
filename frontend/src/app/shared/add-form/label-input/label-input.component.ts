import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './label-input.component.html',
  styleUrl: './label-input.component.css',
})
export class LabelInputComponent {
  @Input() labelName?: string;
  @Input() inputType!: string;
  @Input() inputPlaceholder?: string;
  @Input() secondLabel!: string;
  @Input() addFeature?: string;
  @Input() addFeaturetwo?: string;
  enteredData = '';
}
