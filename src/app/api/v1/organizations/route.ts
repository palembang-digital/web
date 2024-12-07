import { auth } from "@/auth";
import { db } from "@/db";
import { organizations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const organizations = await db.query.organizations.findMany({
    columns: { id: true, name: true },
    orderBy: (organizations, { asc }) => [asc(organizations.name)],
  });

  return NextResponse.json(organizations);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  const newOrganization = await db
    .insert(organizations)
    .values(data.organization)
    .returning();

  return NextResponse.json({
    message: "Organization created",
    data: newOrganization,
  });
}
