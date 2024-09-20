/**
 * @component ToastComponent
 *
 * @description
 * The `ToastComponent` is a reusable UI component used to display toast notifications.
 * It accepts a message, an indicator to display the error state, and a handler function for the button click.
 * The toast can be customized to either show an error state with a "Retry" button or a normal state with a "Done" button.
 *
 * @usage
 * <app-toast [toastMessage]="'This is a message'" [isError]="true" [onClickHandler]="retryFunction"></app-toast>
 *
 * @selector app-toast
 * @templateUrl ./toast.component.html
 * @styleUrl ./toast.component.css
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  /**
   * @input {string} toastMessage
   *
   * @description
   * This is the message that will be displayed inside the toast. It can be an error message or an informative message.
   *
   * @default ''
   *
   * @example
   * <app-toast [toastMessage]="'Server error, please try again later'"></app-toast>
   */
  @Input() toastMessage: string = '';

  /**
   * @input {boolean} isError
   *
   * @description
   * A boolean flag that indicates whether the toast is showing an error message.
   * If `true`, the button will show "Retry". If `false`, the button will show "Done".
   *
   * @default false
   *
   * @example
   * <app-toast [isError]="true"></app-toast>
   */
  @Input() isError: boolean = false;

  /**
   * @input {Function} onClickHandler
   *
   * @description
   * A function that will be executed when the user clicks the button inside the toast.
   * This could be a retry function in the case of an error, or a close function if it's a success or information message.
   *
   * @default () => {}
   *
   * @example
   * <app-toast [onClickHandler]="retryFunction"></app-toast>
   */
  @Input() onClickHandler: Function = () => {};
}
