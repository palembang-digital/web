import { auth } from "@/auth";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { getJobs } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const jobs = await getJobs();

  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  const inputJob = {
    ...data.job,
    createdBy: session.user.id,
    updatedBy: session.user.id,
  };

  await db.transaction(async (tx) => {
    const result = await tx.insert(jobs).values(inputJob).returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to create job" },
        { status: 500 }
      );
    }
  });

  return Response.json({ message: "Job created" });
}
