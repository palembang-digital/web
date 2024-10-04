import { db } from "@/db";
import { organizations } from "@/db/schema";
import { count } from "drizzle-orm";
import { cache } from "react";

export const getOrgsCount = cache(async () => {
  return await db.select({ count: count() }).from(organizations);
});
