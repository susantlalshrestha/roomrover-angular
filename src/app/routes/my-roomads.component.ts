import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { RoomAd } from '../models';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isEmpty } from 'lodash';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-roomads',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  template: `
    <a routerLink="/rooms/create" class="flex justify-end mx-10 mt-10 -z-10">
      <div class=" btn text-teal-900 -z-10">
        <fa-icon [icon]="faBuilding" class="text-base" />
        Add new room ad +
      </div>
    </a>
    <main class="flex flex-col flex-1 py-5">
      <div class="flex flex-col flex-1 my-6 mx-10 card rounded-md text-sm">
        <ng-container *ngIf="isEmptyRoomAds(); else roomAdsTemplate">
          <p class="p-4 absolute text-center self-center">No room added</p>
        </ng-container>
        <ng-template #roomAdsTemplate>
          <table class="divide-x">
            <thead class="bg-blur border-b border-teal-900/10">
              <tr>
                <th class="font-semibold p-4">SN</th>
                <th class="font-semibold p-4">Title</th>
                <th class="font-semibold p-4">Description</th>
                <th class="font-semibold p-4">Price</th>
                <th class="font-semibold p-4">Action</th>
              </tr>
            </thead>
            <tbody class="overflow-y-scroll items-start">
              <tr
                *ngFor="let roomAd of roomAds; let i = index"
                class="border-b border-teal-900/10"
              >
                <td class="p-4 max-h-24 text-center">{{ i + 1 }}</td>
                <td class="p-4 max-h-24">{{ roomAd.title }}</td>
                <td class="p-4 max-h-4 max-w-96 truncate text-ellipsis">
                  {{ roomAd.description }}
                </td>
                <td class="p-4 max-h-24 text-center">{{ roomAd.price }}</td>
                <td class="p-4 max-h-24 text-center">
                  <div class="flex divide-x">
                    <a
                      [routerLink]="['/rooms', roomAd.id, 'edit']"
                      class="flex-1"
                      >Edit</a
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </ng-template>
      </div>
    </main>
  `,
  styles: ``,
})
export class MyRoomadsComponent {
  faBuilding = faBuilding;
  roomAds: RoomAd[] = [];

  constructor(private router: Router, private api: ApiService) {}

  async ngOnInit() {
    this.api.getMyRoomAds().subscribe((res) => {
      if (res.data?.roomAds) {
        this.roomAds = res.data.roomAds;
      }
    });
  }

  isEmptyRoomAds(): boolean {
    return !this.roomAds || isEmpty(this.roomAds);
  }
}
