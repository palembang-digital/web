import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const users = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      username: true,
      image: true,
      occupation: true,
      institution: true,
      bio: true,
    },
    limit: limit,
    orderBy: (users, { asc }) => [asc(users.name)],
  });

  return NextResponse.json(users);
}
