import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { inputType } from '../adding-form.component';
@Component({
  selector: 'app-input-row',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.css',
})
export class InputRowComponent {
  @Input({ required: true }) input_Info!: inputType;
  @Output() inputChanged = new EventEmitter();
  @Input() form?: any;

  ngOnInit(): void {
    this.emmitNewValue({ target: { value: this.input_Info.value } });
  }

  emmitNewValue(e: any) {
    this.inputChanged.emit(e.target!.value);
  }
}
