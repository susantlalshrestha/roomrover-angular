import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: `
    <div class="card w-96 flex justify-center self-center m-auto">
      <div class="w-full h-full flex flex-col">
        <form
          [formGroup]="createForm"
          (ngSubmit)="onSubmit()"
          class="w-full h-full flex flex-col py-8 px-10"
        >
          <label class="form-label" for="title"
            >Please enter the title of your ad</label
          >
          <input
            class="form-input mb-4"
            type="text"
            id="title"
            formControlName="title"
            required
          />
          <label class="form-label" for="price">Enter the price</label>
          <input
            class="form-input mb-4"
            type="number"
            id="price"
            formControlName="price"
            required
          />
          <label class="form-label" for="description"
            >Enter the description. Must be at least 10 characters.</label
          >
          <textarea
            class="form-input mb-4"
            id="description"
            formControlName="description"
            rows="4"
            required
          ></textarea>
          <button
            class="btn mx-0 m-4"
            type="submit"
            [disabled]="createForm.invalid"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class CreateRoomComponent {
  createForm: FormGroup;
  createSubscription?: Subscription;

  constructor(private router: Router, private api: ApiService) {
    this.createForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const router = this.router;
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      this.createSubscription = this.api.createRoomAd(formData).subscribe({
        next(value) {
          router.navigate(['/my-roomads']);
        },
        error(err) {
          console.error('Error creating room ad:', err);
        },
      });
    } else {
      // Handle form validation errors
      console.error('Form validation error');
    }
  }

  get title() {
    return this.createForm.get('title');
  }

  get price() {
    return this.createForm.get('price');
  }

  get description() {
    return this.createForm.get('description');
  }
}
