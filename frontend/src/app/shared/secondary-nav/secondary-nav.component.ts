import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-nav',
  standalone: true,
  templateUrl: './secondary-nav.component.html',
  styleUrl: './secondary-nav.component.css',
})
export class SecondaryNavComponent {
  @Input() tableTitle!: string;
  @Input() addNewButton!: string;
  @Input() btnClickHandler!: Function;
  @Output() btnClicked = new EventEmitter();

  handleClick() {
    this.btnClicked.emit();
  }
}
