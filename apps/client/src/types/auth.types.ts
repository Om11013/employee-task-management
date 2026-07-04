export type Role = "ADMIN" | "EMPLOYEE";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: User;
  accessToken: string;
}

export interface DecodedJwt {
  id: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
