import { Component, Input } from '@angular/core';
import { RoomAd } from '../models';
import { storePhotos } from '../lib/firebase';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex flex-col py-6 px-10">
      <div
        id="image-container"
        class="w-full p-4 aspect-video border-2 grid grid-cols-4 gap-1 grid-rows-2"
      >
        @for (url of images; track $index) {
        <div class="w-full h-full flex flex-col">
          <img
            alt="Image"
            height="100"
            width="100"
            [src]="url"
            class="object-cover object-center w-full h-full"
          />
          <progress
            class="progress"
            [value]="progress[url]"
            max="100"
            [hidden]="progress[url] === 100"
          ></progress>
        </div>
        }
        <button
          *ngIf="images.length < 8"
          class="rounded-none w-full h-full"
          (click)="onAddClick()"
          [disabled]="pending"
        >
          +
        </button>
      </div>
      <input
        class="input input-bordered rounded-sm mb-4 text-sm"
        type="file"
        id="image"
        name="image"
        hidden
        (change)="onChange($event)"
        placeholder="Title"
        accept="image/*"
        required
      />
      <button
        class="btn mx-0 m-4"
        [disabled]="pending || images.length === 0"
        (click)="onSubmit()"
      >
        Upload
      </button>
    </div>
  `,
  styles: `
  .progress {
        width: 100%;
      }`,
})
export class UploadImageComponent {
  @Input() roomAd!: RoomAd;
  images: string[] = [];
  progress: Record<string, number> = {};
  pending = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.images = this.roomAd.images;
    this.progress = this.roomAd.images.reduce(
      (a, c) => ({ ...a, [c]: 100 }),
      {}
    );
  }

  onAddClick() {
    document.getElementById('image')?.click();
  }

  async onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const fileName = `${this.roomAd.id}-${Date.now()}`;
      if (this.images.includes(url)) return;
      this.images.push(url);
      this.progress[url] = 0;
      this.pending = true;
      try {
        await storePhotos('roomads', file, fileName, {
          onChange: (percentage) => {
            this.progress[url] = percentage;
          },
          onComplete: (url) => {
            this.pending = false;
          },
          onError: (error) => {
            console.log(error);
            this.pending = false;
          },
        });
      } catch (error) {
        console.log(error);
        this.pending = false;
      }
    }
  }

  async onSubmit() {
    if (!this.pending && this.images.length > 0) {
      this.pending = true;
      this.api.uploadRoomImage(this.roomAd.id, this.images).subscribe(() => {
        this.pending = false;
      });
    }
  }
}
