import { Component } from '@angular/core';
import { UpdateFormComponent } from '../fragments/update-form.component';
import { UploadImageComponent } from '../fragments/upload-image.component';
import { RoomAd } from '../models';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ApiService } from '../services/api.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    UpdateFormComponent,
    UploadImageComponent,
  ],
  template: `
    <div class="flex flex-row w-full">
      <app-upload-image
        *ngIf="roomAd"
        [roomAd]="roomAd!"
        class="w-1/3"
      ></app-upload-image>
      <app-update-form
        *ngIf="roomAd"
        [roomAd]="roomAd"
        class="flex-1"
      ></app-update-form>
    </div>
  `,
  styles: ``,
})
export class EditRoomComponent {
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
