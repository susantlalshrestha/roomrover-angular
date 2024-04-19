export type APIResponse<Data> = {
  data?: Data | undefined;
  message?: string | undefined;
  action?: string | undefined;
  success: boolean;
};

export type LoginData = {
  account?: Account;
  token?: AuthToken;
};

export type LoginResponse = APIResponse<LoginData>;

export type RegisterResponse = APIResponse<{ email: string }>;

export type VerifyEmailResponse = APIResponse<{ email: string }>;

export type ResendVerificationCodeResponse = APIResponse<{ email: string }>;

export type CreateRoomAdResponse = APIResponse<{ roomAd: RoomAd }>;

export type UpdateRoomAdResponse = APIResponse<{ roomAd: RoomAd }>;

export type GetRoomsResponse = APIResponse<{ roomAds: RoomAd[] }>;

export type GetRoomResponse = APIResponse<{ roomAd: RoomAd }>;

export enum Role {
  ADMIN = "ADMIN",
  HOST = "HOST",
  GUEST = "GUEST",
}

enum ReservationStatus {
  RESERVED = "RESERVED",
  HOLD = "HOLD",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

enum ChatType {
  SINGLE = "SINGLE",
  GROUP = "GROUP",
}

export type AuthToken = {
  access: string;
  refresh: string;
};

export type Account = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneVerified: boolean;
  roles: Role[];
  chatsId: string[];
  profilePhoto: string | null;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomAd = {
  id: string;
  title: string;
  description: string;
  published: boolean;
  publisherId: string;
  images: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Address = {
  id: string;
  aptUnit?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  roomAdId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Reservation = {
  id: string;
  from: Date;
  to: Date;
  status: ReservationStatus;
  roomAdId: string;
  reserveeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Reviews = {
  id: string;
  comment: string;
  rating: number;
  roomAdId: string;
  reviewerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Chat = {
  id: string;
  membersId: string[];
  type: ChatType;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  chatId: string;
  message: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
};
