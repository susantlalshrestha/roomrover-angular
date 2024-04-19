import { Component } from '@angular/core';
import { Account, Role, RoomAd } from '../models';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../fragments/search-bar.component';
import { RoomCardComponent } from '../fragments/room-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    RoomCardComponent,
    HttpClientModule,
  ],
  template: `
    <main *ngIf="isHost"></main>
    <main
      *ngIf="!isHost"
      class="fixed w-full h-full flex flex-col backdrop-blur-md -z-10"
    >
      <app-search-bar (filterChange)="applyFilter($event)" />
      <div class="flex px-12 pt-6 items-center gap-1">
        <p class="">
          {{ roomAds.length + ' results' }}
        </p>
        <p
          *ngIf="searchQuery && searchQuery !== ''"
          class="rounded-full px-4 py-2 bg-teal-900/20 text-sm"
        >
          {{ 'Search: ' + searchQuery }}
        </p>
        <p
          *ngIf="minPrice"
          class="rounded-full px-4 py-2 bg-teal-900/20 text-sm"
        >
          {{ 'Minimun Price: ' + minPrice }}
        </p>
        <p
          *ngIf="maxPrice"
          class="rounded-full px-4 py-2 bg-teal-900/20 text-sm"
        >
          {{ 'Maximum Price: ' + maxPrice }}
        </p>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 pb-36 gap-10 overflow-y-scroll"
      >
        @for (roomAd of roomAds; track roomAd.id) {
        <app-room-card [roomAd]="roomAd" />
        }
      </div>
    </main>
  `,
  styles: ``,
})
export class HomeComponent {
  account?: Account | null;
  isHost: boolean = false;
  roomAds: RoomAd[] = [];
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private session: SessionService, private api: ApiService) {
    this.account = session.getSessionAccount();
    this.isHost = this.account?.roles.includes(Role.HOST) || false;
  }

  ngOnInit() {
    this.account = this.session.accountSig();
    this.getRoomAds();
  }

  private getRoomAds() {
    this.api
      .getAllRooms(this.searchQuery, this.minPrice, this.maxPrice)
      .subscribe((res) => {
        console.log(res);
        this.roomAds = res.data?.roomAds || [];
      });
  }

  applyFilter(filter: {
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
  }) {
    this.searchQuery = filter.searchQuery;
    this.minPrice = filter.minPrice;
    this.maxPrice = filter.maxPrice;
    this.getRoomAds();
  }
}
