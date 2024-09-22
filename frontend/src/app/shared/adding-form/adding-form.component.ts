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
 * <app-adding-form [formInputRows]="inputsArray" [onFormSubmit]="submitHandler" [formHeader]="'Add Case'"></app-adding-form>
 *
 * @imports {InputRowComponent}
 * Used for rendering individual form rows.
 *
 * @selector app-adding-form
 * @templateUrl ./adding-form.component.html
 * @styleUrl ./adding-form.component.css
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputRowComponent } from './input-row/input-row.component';

/**
 * @interface inputType
 * Defines the structure for the form input rows.
 *
 * @property {string} id - Unique identifier for the form field.
 * @property {string} title - The label or placeholder for the form field.
 * @property {'text' | 'password' | 'email' | 'number' | 'date' | 'checkbox' | 'radio' | 'file' | 'tel' | 'url' | 'hidden' | 'range' | 'color' | 'select'} type - The type of the input field.
 * @property {string[]} [options] - Optional. Available options for `select` input type (dropdown).
 * @property {string} [value] - Optional. The value of the input field, typically used for pre-filling data in 'Update' forms.
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
  options?: { id: string; value: string }[];
  value?: string;
}

/**
 * @class AddingFormComponent
 *
 * @description
 * The AddingFormComponent dynamically renders a form based on the `formInputRows` array, which defines each input's properties.
 * User inputs are stored in the `formData` array corresponding to the form inputs by index.
 * The form can be used in both 'Add' and 'Update' modes, based on the `formType` input.
 */
@Component({
  selector: 'app-adding-form',
  standalone: true,
  imports: [InputRowComponent],
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
  @Input({ required: true }) formInputRows!: inputType[];

  /**
   * @input {Function} onFormSubmit
   *
   * @description
   * A function to handle form submission. The function is called when the user submits the form and passes
   * the `formData` array as an argument, which contains all the user input.
   * This input is required for form submission.
   *
   * @example
   * onFormSubmit = (formData) => { console.log(formData); }
   */
  @Input({ required: true }) onFormSubmit!: Function;

  /**
   * @input {'Add' | 'Update'} formType
   *
   * @description
   * Defines the mode of the form. It can either be 'Add' (default) or 'Update'.
   * Depending on this input, the form behavior may change, such as pre-filling existing values for 'Update'.
   *
   * @default 'Add'
   */
  @Input() formType: 'Add' | 'Update' = 'Add';

  /**
   * @input {string} formHeader
   *
   * @description
   * The header text for the form, typically reflecting the action being performed (e.g., 'Add Case' or 'Update Case').
   * This input is required to give context to the form action.
   *
   * @default 'Add Case'
   */
  @Input({ required: true }) formHeader: string = 'Add Case';

  @Output() backdropClicked = new EventEmitter();
  /**
   * @property {string[]} formData
   *
   * @description
   * Stores the data entered by the user in the form. The data corresponds to the form inputs in the `formInputRows` array.
   * Each index in this array matches the index of the form input rows.
   */
  private formData: string[] = [];

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
  }

  /**
   * @method submitForm
   *
   * @description
   * Calls the `onFormSubmit` function and passes the `formData` as an argument when the form is submitted.
   * This function is triggered by the form's submit button.
   */
  submitForm() {
    if (this.onFormSubmit) {
      this.onFormSubmit(this.formData);
    }
  }
  /**
   * @method closeForm
   *
   * @description
   * Emits an event to close the form by clicking on the backdrop.
   */
  closeForm() {
    this.backdropClicked.emit();
  }
}
