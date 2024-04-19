import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { omit } from 'lodash';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: ` <div class="flex w-full h-full justify-center items-center">
    <div
      class="w-1/3 flex flex-col shadow-lg shadow-teal-900/20 rounded-md overflow-y-scroll"
    >
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      <form
        *ngIf="registerForm"
        [formGroup]="registerForm"
        (ngSubmit)="onSubmit()"
        class="w-full h-full flex flex-col py-8 px-10 overflow-y-scroll"
      >
        <label class="form-label" for="first_name"
          >Enter your first name.</label
        >
        <input
          class="form-input mb-4"
          type="text"
          id="first_name"
          formControlName="firstName"
          required
        />
        <label class="form-label" for="last_name">Enter your last name.</label>
        <input
          class="form-input mb-4"
          type="text"
          id="last_name"
          formControlName="lastName"
          required
        />
        <label class="form-label" for="email">Enter your email id.</label>
        <input
          class="form-input mb-4"
          type="email"
          id="email"
          formControlName="email"
          required
        />
        <label class="form-label" for="phone_number"
          >Enter your phone number.</label
        >
        <input
          class="form-input mb-4"
          type="tel"
          id="phone_number"
          formControlName="phoneNumber"
          pattern="d{3}[-s]?d{3}[-s]?d{4}"
          required
          title="Please enter a valid phone number (xxx-xxx-xxxx)"
        />
        <label class="form-label" for="password">Enter your password.</label>
        <input
          class="form-input mb-4"
          type="password"
          id="password"
          formControlName="password"
          required
        />
        <label class="form-label" for="confirm_password"
          >Enter your password again to make sure.</label
        >
        <input
          class="form-input mb-4"
          type="password"
          id="confirm_password"
          formControlName="confirmPassword"
          required
        />
        <div class="flex">
          <label class="form-label flex-1 text-center" for="guest">
            <input
              type="radio"
              id="guest"
              formControlName="role"
              value="GUEST"
            />
            <span class="inline-block mx-4">Guest</span>
          </label>
          <label class="form-label flex-1 text-center" for="host">
            <input type="radio" id="host" formControlName="role" value="HOST" />
            <span class="inline-block mx-4">Host</span>
          </label>
        </div>
        <button type="submit" class="btn mx-0 m-4" [disabled]="loading">
          Register
        </button>
      </form>
    </div>
  </div>`,
  styles: ``,
})
export class RegisterComponent {
  registerForm?: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Validators.pattern(/[a-zA-Z0-9]/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['GUEST', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    ); // Add custom validator for password match
  }

  // Custom validator for password match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm?.errors) {
      console.log(this.registerForm);

      this.errorMessage = 'Found invalid form fields';
      return;
    }
    const formValues = this.registerForm?.value;
    this.api.register(omit(formValues, 'confirmPassword')).subscribe((res) => {
      if (res.data) {
        if (res.action && res.action === 'verify-email') {
          this.router.navigate([`/email-verification`], {
            replaceUrl: true,
            queryParams: { email: res.data.email },
          });
        } else {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      } else if (res.message) {
        this.errorMessage = res.message;
      }
    });
  }
}
