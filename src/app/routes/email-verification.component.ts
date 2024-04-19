import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: `
    <div class="absolute flex w-full h-full justify-center items-center">
      <div
        class="w-1/3 flex flex-col shadow-lg shadow-teal-900/20 rounded-md overflow-y-scroll"
      >
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        <form
          *ngIf="verifyEmailForm"
          [formGroup]="verifyEmailForm"
          (ngSubmit)="onSubmit()"
          class="w-full h-full flex flex-col py-8 px-10"
        >
          <label class="form-label" for="email">What is your email id?</label>
          <input
            class="form-input mb-4"
            type="email"
            id="email"
            formControlName="email"
            required
            aria-disabled="true"
            [disabled]="true"
          />
          <label class="form-label" for="otp">Enter your otp here.</label>
          <input
            class="form-input mb-4"
            type="number"
            id="otp"
            formControlName="otp"
            required
          />
          <button
            type="submit"
            class="btn mx-0 m-4"
            [disabled]="verifyEmailForm.invalid"
          >
            VerifyEmail
          </button>
          <button type="button" class="btn mx-0 m-4" (click)="resendCode()">
            ResendCode
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class EmailVerificationComponent {
  verifyEmailForm?: FormGroup;
  email: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });

    this.verifyEmailForm = this.formBuilder.group({
      email: [{ value: this.email, disabled: true }],
      otp: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.verifyEmailForm?.invalid) {
      return;
    }

    const otp = this.verifyEmailForm?.value.otp;

    this.api.verifyEmail(this.email, otp).subscribe(
      (response) => {
        if (response.data) {
          this.router.navigate(['/login'], {
            queryParams: { email: this.email },
          });
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error: Error) => {
        console.error(error);
        this.errorMessage = error.message;
        // Handle error
      }
    );
  }
  resendCode() {
    if (this.email) {
      this.api.resendVerificationCode(this.email).subscribe(
        (response) => {
          // Handle success
          console.log(response);
        },
        (error: Error) => {
          console.error(error);
          this.errorMessage = error.message;
          // Handle error
        }
      );
    }
  }
}
