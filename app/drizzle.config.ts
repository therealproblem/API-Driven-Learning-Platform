import type { Config } from "drizzle-kit";
import dbConfig from './src/config/dbConfig';
import config from "./src/config/config";

export default {
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    ssl: config.nodeEnv === "production" ? { rejectUnauthorized: false } : false,
  },
} satisfies Config;