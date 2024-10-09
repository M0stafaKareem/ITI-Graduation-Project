import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  button!: HTMLButtonElement;
  @Input({ required: true }) enteredEmail!: string;
  @Input({ required: true }) enteredPassword!: string;
  @Output() close = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit(): void {
    this.button = document.querySelector('.verify-btn') as HTMLButtonElement;

    this.otpInputs.forEach((inputRef, index) => {
      const input = inputRef.nativeElement;

      input.addEventListener('keyup', (e: KeyboardEvent) => {
        const currentInput = input;
        const nextInput = currentInput.nextElementSibling as HTMLInputElement;
        const prevInput =
          currentInput.previousElementSibling as HTMLInputElement;

        if (currentInput.value.length > 1) {
          currentInput.value = '';
          return;
        }

        if (currentInput.value !== '' && nextInput) {
          nextInput.removeAttribute('disabled');
          nextInput.focus();
        }

        if (e.key === 'Backspace') {
          currentInput.value = '';
          if (prevInput) {
            currentInput.disabled = true;
            prevInput.focus();
          }
        }
      });
    });

    // Focus the first input when the component initializes
    this.otpInputs.first.nativeElement.focus();
  }
  checkInputsAreNotEmpty() {
    const allFilled = Array.from(this.otpInputs.toArray()).every(
      (inputRef) => inputRef.nativeElement.value.length === 1
    );
    if (allFilled) {
      this.button.classList.add('active');
      this.button.disabled = false;
    } else {
      this.button.classList.remove('active');
      this.button.disabled = true;
    }
  }

  async verifyBtnHandler() {
    this.spinner.show();
    let otp = '';
    this.otpInputs.forEach((inputRef) => {
      otp += inputRef.nativeElement.value;
    });

    this.loginService
      .verifyOtp(this.enteredEmail, this.enteredPassword, otp)
      .then((responce) => {
        if (responce === 'welcome') {
          this.toastr.success(`Welcome Home!`, 'Access Granted', {
            positionClass: 'toast-bottom-right',
          });
          this.router.navigate(['']);
        } else {
          this.toastr.error(responce.message, 'login failed', {
            positionClass: 'toast-bottom-right',
          });
        }
        this.spinner.hide();
      });
  }

  closeForm() {
    this.close.emit();
  }
}
