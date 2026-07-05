import { requestV1 } from "../../api/rest";
import type { AuthResponse, User } from "../../types/auth.types";
import type {
  LoginPayload,
  RegisterPayload,
} from "../../validations/auth.schema";

export const register = async (
  data: RegisterPayload,
): Promise<AuthResponse> => {
  return requestV1<RegisterPayload, AuthResponse>(
    "POST",
    "/auth/register",
    data,
  );
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  return requestV1<LoginPayload, AuthResponse>("POST", "/auth/login", data);
};

export const me = async (): Promise<{ success: boolean; user: User }> => {
  return requestV1<void, { success: boolean; user: User }>("GET", "/auth/me");
};

export const logout = async (): Promise<{ success: boolean }> => {
  return requestV1<void, { success: boolean }>("POST", "/auth/logout");
};

export const refresh = async (): Promise<{
  success: boolean;
  accessToken: string;
}> => {
  return requestV1<void, { success: boolean; accessToken: string }>(
    "POST",
    "/auth/refresh",
  );
};
