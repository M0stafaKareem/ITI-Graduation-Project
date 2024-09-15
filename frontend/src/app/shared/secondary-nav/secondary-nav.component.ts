import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.css',
})
export class SecondaryNavComponent {
  @Input() tableTitle!: string;
  @Input() addNewButton!: string;
}
