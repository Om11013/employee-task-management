import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "superrefreshsecret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
