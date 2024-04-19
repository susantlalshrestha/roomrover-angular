import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './routes/home.component';
import { LoginComponent } from './routes/login.component';
import { RegisterComponent } from './routes/register.component';
import { EmailVerificationComponent } from './routes/email-verification.component';
import { MyRoomadsComponent } from './routes/my-roomads.component';
import { EditRoomComponent } from './routes/edit-room.component';
import { CreateRoomComponent } from './routes/create-room.component';
import { RoomComponent } from './routes/room.component';
import { Role } from './models';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Roomrover - Home', component: HomeComponent },
  { path: 'login', title: 'Roomrover - Login', component: LoginComponent },
  {
    path: 'register',
    title: 'Roomrover - Register',
    component: RegisterComponent,
  },
  {
    path: 'email-verification',
    title: 'Roomrover - Email Verification',
    component: EmailVerificationComponent,
  },
  {
    path: 'rooms/create',
    title: 'Roomrover - Create Room',
    component: CreateRoomComponent,
    canActivate: [authGuard(Role.HOST)],
  },
  {
    path: 'rooms/:id/edit',
    title: 'Roomrover - Edit Room',
    component: EditRoomComponent,
    canActivate: [authGuard(Role.HOST)],
  },
  { path: 'rooms/:id', title: 'Roomrover - Room', component: RoomComponent },
  {
    path: 'my-roomads',
    title: 'Roomrover - My RoomAds',
    component: MyRoomadsComponent,
    canActivate: [authGuard(Role.HOST)],
  },
  // {
  //   path: 'my-reservations',
  //   title: 'Roomrover - My Reservations',
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'reservations',
  //   title: 'Roomrover - Reservations',
  //   canActivate: [authGuard],
  // },
  // { path: 'messages', title: 'Roomrover - Messages', canActivate: [authGuard] },
  // {
  //   path: 'saved-ads',
  //   title: 'Roomrover - SavedAds',
  //   canActivate: [authGuard],
  // },
];
