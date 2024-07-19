import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.query.users.findMany({
    columns: { id: true, name: true, username: true, image: true },
    orderBy: (users, { asc }) => [asc(users.name)],
  });

  return NextResponse.json(users);
}
