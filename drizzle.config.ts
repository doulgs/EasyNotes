import type { Config } from "drizzle-kit";
export default {
  schema: "./src/database/schemas/*",
  out: "./src/database/drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;
