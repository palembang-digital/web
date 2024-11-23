import { db } from "@/db";
import { cache } from "react";

export const getJobs = async () => {
  const jobs = await db.query.jobs.findMany({
    orderBy: (jobs, { asc }) => [asc(jobs.createdAt)],
  });

  return jobs;
};

export const getJob = cache(async (id: number) => {
  const job = await db.query.jobs.findFirst({
    where: (jobs, { eq }) => eq(jobs.id, id),
  });

  return job;
});
