import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../fragments/search-bar.component';
import { RoomCardComponent } from '../fragments/room-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomAd } from '../models';
import { switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    RoomCardComponent,
    HttpClientModule,
  ],
  template: `
    <div *ngIf="roomAd" class="flex flex-row w-full border-b">
      <div class="w-1/3 flex-col my-6 mx-10">
        <div class="carousel w-full aspect-video">
          <div
            *ngFor="let image of roomAd.images; let index = index"
            id="item{{ index }}"
            class="carousel-item w-full"
          >
            <img
              [src]="image"
              alt="{{ image }}"
              class="w-full object-cover object-center aspect-video"
            />
          </div>
        </div>
        <div class="flex justify-center w-full py-2 gap-2">
          <a
            *ngFor="let image of roomAd.images; let index = index"
            href="#item{{ index }}"
            class=""
            >{{ index + 1 }}</a
          >
        </div>
      </div>
      <div class="flex-1 flex flex-col my-6 mx-10">
        <p class="flex items-center gap-2 rounded-sm mb-4 text-sm">
          # ID: {{ roomAd.id }}
        </p>
        <p class="flex items-center gap-2 rounded-sm mb-4 text-lg">
          Title: {{ roomAd.title }}
        </p>
        <p class="flex items-center gap-2 rounded-sm mb-4 text-xl">
          Price: {{ roomAd.price }}
        </p>
        <p class="flex items-center gap-2 rounded-sm mb-4 text-sm">
          {{ roomAd.description }}
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class RoomComponent {
  roomAd?: RoomAd;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params) => this.apiService.getRoom(params['id'])))
      .subscribe((res) => {
        this.roomAd = res?.data?.roomAd;
        console.log(this.roomAd);

        if (!this.roomAd) {
          this.router.navigate(['/my-roomads']);
        }
      });
  }
}
