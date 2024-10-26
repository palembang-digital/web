"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function JobList() {
  const { data, isLoading } = useSWR("/api/v1/jobs", fetcher);

  if (isLoading) {
    return <div className="p-6">Loading our jobs...</div>;
  }

  return (
    <ul>
      {data &&
        data.map((job: any) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.position}</p>
          </li>
        ))}
    </ul>
  );
}
