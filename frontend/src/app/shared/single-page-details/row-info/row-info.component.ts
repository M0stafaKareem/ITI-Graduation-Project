import { Component, Input } from '@angular/core';

@Component({
  selector: 'div[bio-row]',
  standalone: true,
  imports: [],
  templateUrl: './row-info.component.html',
  styleUrl: './row-info.component.css',
  host: { class: 'bio-row ' },
})
export class RowInfoComponent {
  @Input() label?: any;
  @Input() value?: any;
}
