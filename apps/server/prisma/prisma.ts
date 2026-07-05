import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import type { PoolConfig } from "mariadb";

const config: PoolConfig = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  connectionLimit: 5,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaMariaDb(config as any);

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  adapter,
});

export default prisma;
