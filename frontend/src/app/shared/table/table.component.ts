import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() firstColumnHeader!: string;
  @Input() secondColumnHeader!: string;
  @Input() thirdColumnHeader!: string;
  @Input() fourthColumnHeader!: string;
}
