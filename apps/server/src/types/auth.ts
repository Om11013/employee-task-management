export interface UserPayload {
  id: number;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
}

export interface RefreshPayload {
  id: number;
}
