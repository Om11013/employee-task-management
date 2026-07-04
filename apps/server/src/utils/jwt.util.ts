import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import type { UserPayload, RefreshPayload } from "../types/auth.js";

export const generateAccessToken = (payload: UserPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (
  payload: RefreshPayload,
  rememberMe: boolean,
): string => {
  const expiresIn = rememberMe ? "30d" : "7d";
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn });
};

export const verifyAccessToken = (token: string): UserPayload => {
  return jwt.verify(token, ENV.JWT_SECRET) as UserPayload;
};

export const verifyRefreshToken = (token: string): RefreshPayload => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as RefreshPayload;
};
