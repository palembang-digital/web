import { db } from "@/db";

export const getJobs = async () => {
  const jobs = await db.query.jobs.findMany({
    orderBy: (jobs, { asc }) => [asc(jobs.createdAt)],
  });

  return jobs;
};
