import { defineConfig } from "drizzle-kit";

require("dotenv").config({ path: [".env.local", ".env"] });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL || "",
  },
});
