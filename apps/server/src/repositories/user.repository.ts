import { pool } from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface UserRow extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: "ADMIN" | "EMPLOYEE";
}

export const findUserByEmail = async (
  email: string,
): Promise<UserRow | null> => {
  const [rows] = await pool.query<UserRow[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return rows[0] || null;
};

export const findUserById = async (id: number): Promise<UserRow | null> => {
  const [rows] = await pool.query<UserRow[]>(
    "SELECT * FROM users WHERE id = ?",
    [id],
  );
  return rows[0] || null;
};

export const createUser = async (
  fullName: string,
  email: string,
  passwordHash: string,
  role: string,
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [fullName, email, passwordHash, role],
  );
  return result.insertId;
};
