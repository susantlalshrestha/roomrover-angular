import { Component, Input } from '@angular/core';
import { RoomAd } from '../models';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="roomAd" class="relative w-full h-full rounded-md">
      <img
        [src]="roomAd.images.length > 0 ? roomAd.images[0] : undefined"
        [alt]="roomAd.title"
        class="w-full aspect-square object-cover object-center rounded-t-md"
      />
      <a
        [routerLink]="['/rooms', roomAd.id]"
        class="absolute bottom-0 left-0 right-0 h-1/3 transition-all duration-300 backdrop-blur-md bg-white/30 flex flex-col px-6 py-4 overflow-hidden"
      >
        <p class="text-sm truncate">{{ roomAd.title }}</p>
        <p class="flex-1 text-2xl font-thin">
          {{ '$' + roomAd.price + '/day' }}
        </p>
      </a>
    </div>
  `,
  styles: `div:hover a {@apply h-2/5}`,
})
export class RoomCardComponent {
  @Input() roomAd!: RoomAd;
}
