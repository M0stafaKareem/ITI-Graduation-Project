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
  @Output() search: EventEmitter<string> = new EventEmitter();

  handleClick() {
    this.btnClicked.emit();
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search.emit(inputElement.value);
  }
}
