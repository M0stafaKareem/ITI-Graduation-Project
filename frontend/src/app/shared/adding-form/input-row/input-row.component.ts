import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inputType } from '../adding-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.css',
})
export class InputRowComponent {
  @Input({ required: true }) input_Info!: inputType;
  @Output() inputChanged = new EventEmitter();

  emmitNewValue(e: any) {
    this.inputChanged.emit(e.target!.value);
  }
}
