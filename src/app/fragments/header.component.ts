import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import {
  ActivatedRoute,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { Account, Role } from '../models';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHomeLg,
  faCalendarDays,
  faMessage,
  faBookmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type MenuItem = {
  title: string;
  icon: IconDefinition;
  routerLink: string;
};

type DropDownMenuItem =
  | {
      type: 'link';
      title: string;
      routerLink: string;
    }
  | {
      type: 'button';
      title: string;
      onClick: () => void;
    };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, FontAwesomeModule],
  template: `<div
    class="flex h-[10%] items-center p-6 backdrop-blur-xl bg-white/30 shadow-sm"
  >
    <div class="justify-start items-center">
      <a class="text-lg font-bold drop-shadow-xl" [routerLink]="'/'"
        >Room Rover</a
      >
    </div>
    <nav class="flex-1 mx-14 justify-start items-center flex">
      @for(menu of navMenus; track $index) {
      <a
        class="flex justify-center items-center hover:scale-110 transition-transform duration-300 mx-2 border-teal-900 cursor-default"
        [routerLink]="[menu.routerLink]"
        routerLinkActive="activeMenu"
        ariaCurrentWhenActive="page"
      >
        <fa-icon [icon]="menu.icon" class="text-base" />
        <span class="text-sm mx-2">{{ menu.title }}</span>
      </a>
      }
    </nav>
    <div id="dropdown" class="flex justify-end items-center">
      <p class="font-bold text-sm mx-4">
        Hello, {{ account?.firstName || 'Welcome' }}
      </p>
      <div class="relative z-50">
        <img
          src="/assets/images/profile.png"
          class="object-scale-down object-center p-2 w-12 aspect-square rounded-full bg-amber-50  shadow-sm hover:shadow-lg hover:shadow-amber-600/25 transition-shadow duration-300 ease-out"
          height="0"
          width="0"
          (click)="this.toggleDropdown()"
        />
        <div
          *ngIf="dropdown"
          id="dropdown-content"
          class="absolute flex flex-col w-52 mt-6 p-2 -right-2 backdrop-blur-md bg-white/20 shadow-xl shadow-teal-900/10 rounded-md z-50"
        >
          @for (menu of authMenus; track $index) {
          <a
            *ngIf="menu.type === 'link'"
            [href]="menu.routerLink"
            class="text-sm p-2 my-1 bg-transparent transition-colors duration-300 text-center hover:bg-teal-900/10"
            >{{ menu.title }}</a
          >
          <button
            *ngIf="menu.type === 'button'"
            (click)="menu.onClick()"
            class="text-sm p-2 my-1 bg-transparent transition-colors duration-300 text-center hover:bg-teal-900/10"
          >
            {{ menu.title }}
          </button>
          }
        </div>
      </div>
    </div>
  </div>`,
  styles: `.activeMenu {@apply font-bold border-b;}
  `,
})
export class HeaderComponent {
  account?: Account | null;
  navMenus: MenuItem[] = [];
  authMenus: DropDownMenuItem[] = [];
  dropdown: boolean = false;
  logout() {
    this.session.removeSession();
  }

  constructor(private session: SessionService) {
    this.account = this.session.getSessionAccount();
    this.logout = session.removeSession;
    this.generateNavMenus();
    this.generateAuthMenus();
  }

  ngOnInit() {
    this.account = this.session.accountSig();
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  private generateAuthMenus() {
    if (this.account) {
      this.authMenus.push({
        type: 'button',
        title: 'Logout',
        onClick: this.logout,
      });
    } else {
      this.authMenus.push({
        type: 'link',
        title: 'Login',
        routerLink: '/login',
      });
      this.authMenus.push({
        type: 'link',
        title: 'Register',
        routerLink: '/register',
      });
    }
  }

  private generateNavMenus() {
    this.navMenus.push({
      title: 'Home',
      icon: faHomeLg,
      routerLink: '/home',
    });
    if (this.account?.roles.includes(Role.GUEST)) {
      this.navMenus.push({
        title: 'My Reservations',
        icon: faCalendarDays,
        routerLink: '/my-reservations',
      });
      this.navMenus.push({
        title: 'Messages',
        icon: faMessage,
        routerLink: '/messages',
      });
      this.navMenus.push({
        title: 'Saved Ads',
        icon: faBookmark,
        routerLink: '/saved',
      });
    }
    if (this.account?.roles.includes(Role.HOST)) {
      this.navMenus.push({
        title: 'My RoomAds',
        icon: faCalendarDays,
        routerLink: '/my-roomads',
      });
      this.navMenus.push({
        title: 'Messages',
        icon: faMessage,
        routerLink: '/messages',
      });
      this.navMenus.push({
        title: 'Reservations',
        icon: faBookmark,
        routerLink: '/reservations',
      });
    }
  }
}
