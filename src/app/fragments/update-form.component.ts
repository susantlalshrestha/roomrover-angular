import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoomAd } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: ` <form
    [formGroup]="form"
    class="flex flex-col py-6 px-10"
    (ngSubmit)="onSubmit()"
  >
    <label
      class="input input-bordered flex items-center gap-2 rounded-sm mb-4 text-sm"
    >
      # ID:
      <input
        class="grow form-input"
        type="text"
        id="id"
        name="id"
        placeholder="ID"
        [value]="roomAd?.id"
        formControlName="id"
        readonly
        required
      />
    </label>
    <label
      class="input input-bordered flex items-center gap-2 rounded-sm mb-4 text-sm"
    >
      Title:
      <input
        class="grow form-input"
        type="text"
        id="title"
        name="title"
        [value]="roomAd?.title"
        placeholder="Title"
        formControlName="title"
        required
      />
    </label>
    <label
      class="input input-bordered flex items-center gap-2 rounded-sm mb-4 text-sm"
    >
      Price:
      <input
        class="grow form-input"
        type="number"
        id="price"
        name="price"
        [value]="roomAd?.price"
        placeholder="Price"
        formControlName="price"
        required
      />
    </label>
    <textarea
      class="input flex-1 input-bordered rounded-sm mb-4 p-4 min-h-56 text-sm"
      id="description"
      name="description"
      [value]="roomAd?.description"
      placeholder="Description"
      formControlName="description"
      required
    ></textarea>
    <button class="btn mx-0 m-4 col-span-3" type="submit" [disabled]="pending">
      Update
    </button>
  </form>`,
  styles: ``,
})
export class UpdateFormComponent {
  @Input() roomAd?: RoomAd;

  form: FormGroup;
  pending = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    console.log(this.roomAd);

    this.form = this.fb.group({
      id: [this.roomAd?.id, Validators.required],
      title: [this.roomAd?.title, Validators.required],
      price: [this.roomAd?.price, Validators.required],
      description: [this.roomAd?.description, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {
    // Check if roomAd is available and update form controls
    if (this.roomAd) {
      this.initializeForm();
    }
  }

  private initializeForm() {
    this.form.patchValue({
      id: this.roomAd?.id || '',
      title: this.roomAd?.title || '',
      price: this.roomAd?.price || '',
      description: this.roomAd?.description || '',
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.pending = true;
      this.api.updateRoomAd(this.form.value).subscribe(() => {
        this.pending = false;
      });
    }
  }
}
