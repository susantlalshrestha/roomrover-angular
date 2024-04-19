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
import { CommonModule } from '@angular/common';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: `
    <div class="fixed flex w-full h-full justify-center items-center">
      <div class="w-1/3 flex flex-col shadow-lg shadow-teal-900/20 rounded-md">
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        <form
          *ngIf="loginForm"
          [formGroup]="loginForm"
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
          />
          <label class="form-label" for="password">Enter your password.</label>
          <input
            class="form-input mb-4"
            type="password"
            id="password"
            formControlName="password"
            required
          />
          <button type="submit" class="btn mx-0 m-4" [disabled]="loading">
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  loginForm?: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    // Initialize form with email from query params
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.loginForm?.patchValue({
          email: params['email'],
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm?.invalid) {
      this.errorMessage = 'Invalid email or password';
      return;
    }
    const email = this.loginForm?.value.email;
    const password = this.loginForm?.value.password;
    if (!email || !password) {
      this.errorMessage = 'Invalid email or password';
      return;
    }
    this.api.authenticate(email, password).subscribe((res) => {
      if (res.data?.account && res.data?.token) {
        this.session.setSession(res.data.account, res.data.token);
      }
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }
}
