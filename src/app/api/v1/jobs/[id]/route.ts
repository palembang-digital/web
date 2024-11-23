import { auth } from "@/auth";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { getJob } from "@/services";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const currentJob = await getJob(params.id);
  if (!currentJob) {
    return Response.json({ message: "Job not found" }, { status: 404 });
  }

  if (session?.user?.id !== currentJob.createdBy) {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  const data = await req.json();

  const inputJob = {
    ...data.job,
  };

  await db.transaction(async (tx) => {
    await tx.update(jobs).set(inputJob).where(eq(jobs.id, params.id));
  });

  const updatedJob = await getJob(params.id);

  return Response.json({
    message: "Job updated",
    data: updatedJob,
  });
}
