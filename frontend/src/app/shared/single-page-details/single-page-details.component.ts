import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-page-details',
  standalone: true,
  imports: [],
  templateUrl: './single-page-details.component.html',
  styleUrl: './single-page-details.component.css',
})
export class SinglePageDetailsComponent {
  @Input() title!: string;
  @Input() titleContact!: string;
  @Input() pageTitle!: string;
  @Input() name!: string;
  @Input() email!: string;
  @Input() mobile!: string;
}
