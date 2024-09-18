import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.css',
})
export class SecondaryNavComponent {
  @Input() tableTitle!: string;
  @Input() addNewButton!: string;
  @Input() addingRoute!: string;
}
