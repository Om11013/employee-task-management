import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  USER_LOCAL_STORAGE_KEY,
} from "../constants/auth.constants";
import type { DecodedJwt, User } from "../types/auth.types";

export const saveAccessToken = (token: string, rememberMe: boolean) => {
  const expires = rememberMe ? 30 : 7;
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, { expires });
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
};

export const saveUser = (user: User) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};

export const decodeJwt = (token: string): DecodedJwt | null => {
  try {
    return jwtDecode<DecodedJwt>(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeJwt(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const clearAuth = () => {
  removeAccessToken();
  removeUser();
};
