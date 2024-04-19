import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';
import {
  Account,
  CreateRoomAdResponse,
  GetRoomResponse,
  GetRoomsResponse,
  LoginResponse,
  RegisterResponse,
  ResendVerificationCodeResponse,
  RoomAd,
  VerifyEmailResponse,
} from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private session: SessionService, private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/auth/login`,
      { email, password },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  register(formData: Partial<Account>) {
    return this.http.post<RegisterResponse>(
      `${environment.apiBaseUrl}/auth/register`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  verifyEmail(email: string, otp: number) {
    return this.http.post<VerifyEmailResponse>(
      `${environment.apiBaseUrl}/auth/verify-email`,
      { email, otp },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  resendVerificationCode(email: string) {
    return this.http.post<ResendVerificationCodeResponse>(
      `${environment.apiBaseUrl}/auth/resend-email-otp`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  getAllRooms(
    search?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<GetRoomsResponse> {
    return this.http.post<GetRoomsResponse>(
      `${environment.apiBaseUrl}/rooms/get-all`,
      { search, minPrice, maxPrice },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  getMyRoomAds(): Observable<GetRoomsResponse> {
    const token = this.session.getSessionToken();
    console.log(token);

    return this.http.post<GetRoomsResponse>(
      `${environment.apiBaseUrl}/account/get-rooms`,
      {},
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token?.access}`,
        },
      }
    );
  }

  createRoomAd(roomAd: Partial<RoomAd>): Observable<CreateRoomAdResponse> {
    const token = this.session.getSessionToken();
    console.log(token);

    return this.http.post<CreateRoomAdResponse>(
      `${environment.apiBaseUrl}/rooms/create`,
      roomAd,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token?.access}`,
        },
      }
    );
  }

  uploadRoomImage(
    id: string,
    images: string[]
  ): Observable<CreateRoomAdResponse> {
    const token = this.session.getSessionToken();
    console.log(token);

    return this.http.post<CreateRoomAdResponse>(
      `${environment.apiBaseUrl}/rooms/update/${id}`,
      { images },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token?.access}`,
        },
      }
    );
  }

  updateRoomAd(roomAd: Partial<RoomAd>): Observable<CreateRoomAdResponse> {
    const token = this.session.getSessionToken();
    console.log(token);
    return this.http.post<CreateRoomAdResponse>(
      `${environment.apiBaseUrl}/rooms/update/${roomAd.id}`,
      roomAd,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token?.access}`,
        },
      }
    );
  }

  getRoom(id: string): Observable<GetRoomResponse> {
    return this.http.get<GetRoomResponse>(
      `${environment.apiBaseUrl}/rooms/get/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
