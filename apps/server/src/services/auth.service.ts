import {
  findUserByEmail,
  findUserById,
  createUser,
} from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateAccessToken } from "../utils/jwt.util.js";
import { AppError } from "../utils/AppError.js";
import type { UserPayload } from "../types/auth.js";

export const register = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { fullName, email, password, role } = data;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }

  const passwordHash = await hashPassword(password);

  const insertId = await createUser(fullName, email, passwordHash, role);

  return {
    id: insertId,
    fullName,
    email,
    role,
  };
};

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};

export const getMe = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};

import jwt from "jsonwebtoken";
import { blacklistToken } from "../repositories/user.repository.js";

export const logout = async (token: string) => {
  const decoded = jwt.decode(token) as { exp?: number } | null;

  if (decoded && decoded.exp) {
    const expiresAt = new Date(decoded.exp * 1000);
    await blacklistToken(token, expiresAt);
  }
};
