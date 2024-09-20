/**
 * @component AddingFormComponent
 *
 * @description
 * The AddingFormComponent dynamically generates a form based on an array of form inputs (provided via `formInputRows`).
 * Each input can be of various HTML input types such as `text`, `password`, `email`, and even dropdown (`select`).
 * The component captures and stores the user input in the `formData` array.
 *
 * The component uses a child component, `InputRowComponent`, for each form input field and listens for value changes
 * from the child component to store the corresponding data.
 *
 * @usage
 * <app-adding-form [formInputRows]="inputsArray"></app-adding-form>
 *
 * @imports {InputRowComponent}
 * Used for rendering individual form rows.
 *
 * @selector app-adding-form
 * @templateUrl ./adding-form.component.html
 * @styleUrl ./adding-form.component.css
 */
import { Component, Input } from '@angular/core';
import { InputRowComponent } from './input-row/input-row.component';
import { ToastComponent } from '../toast/toast.component';

/**
 * @interface inputType
 * Defines the structure for the form input rows.
 *
 * @property {string} id - Unique identifier for the form field.
 * @property {string} title - The label or placeholder for the form field.
 * @property {'text' | 'password' | 'email' | 'number' | 'date' | 'checkbox' | 'radio' | 'file' | 'tel' | 'url' | 'hidden' | 'range' | 'color' | 'select'} type - The type of the input field.
 * @property {string[]} [options] - Optional. Available options for `select` input type (dropdown).
 */
export interface inputType {
  id: string;
  title: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'tel'
    | 'url'
    | 'hidden'
    | 'range'
    | 'color'
    | 'select';
  options?: string[];
}

/**
 * @class AddingFormComponent
 *
 * @description
 * The AddingFormComponent dynamically renders a form based on the `formInputRows` array, which defines each input's properties.
 * User inputs are stored in the `formData` array corresponding to the form inputs by index.
 */
@Component({
  selector: 'app-adding-form',
  standalone: true,
  imports: [InputRowComponent, ToastComponent],
  templateUrl: './adding-form.component.html',
  styleUrl: './adding-form.component.css',
})
export class AddingFormComponent {
  /**
   * @input {inputType[]} formInputRows
   *
   * @description
   * Array of input field configurations. Each object in this array represents a single input field
   * with its properties such as `id`, `title`, `type`, and `options` (for dropdowns).
   * This input is required and is used to dynamically generate the form fields.
   *
   * @example
   * [
   *   { id: '1', title: 'Name', type: 'text' },
   *   { id: '2', title: 'Email', type: 'email' },
   *   { id: '3', title: 'Gender', type: 'select', options: ['Male', 'Female'] }
   * ]
   */
  @Input({ required: true }) formInputRows: inputType[] = [
    {
      id: '1',
      title: 'Marwan',
      type: 'select',
      options: ['Male', 'Marwan', 'ezz'],
    },
    { id: '12', title: 'email', type: 'date' },
    { id: '11', title: 'password', type: 'password' },
    { id: '13', title: 'Gender', type: 'select', options: ['Male', 'Female'] },
  ];

  /**
   * @property {string[]} formData
   *
   * @description
   * An array that stores the user input values. Each index corresponds to the position of the form input
   * in the `formInputRows` array. For example, the first input's value is stored at index `0`.
   *
   * @default []
   */
  formData: string[] = [];

  /**
   * @method saveInputData
   *
   * @param {number} index - The index of the form input being updated (matches the position in `formInputRows`).
   * @param {string} value - The user-entered value for the corresponding input.
   *
   * @description
   * Updates the `formData` array with the value entered by the user at the specified index.
   * This method is called by child components (`InputRowComponent`) to notify the parent component (`AddingFormComponent`)
   * about input changes.
   *
   * @example
   * // Updates the first input value to 'John Doe'
   * this.saveInputData(0, 'John Doe');
   */
  saveInputData(index: number, value: string) {
    this.formData[index] = value;
    console.log(this.formData); // Logs the form data whenever a value is updated
  }
}
