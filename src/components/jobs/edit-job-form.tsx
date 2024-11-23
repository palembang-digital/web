"use client";

import JobForm from "@/components/jobs/job-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditJobForm({ job }: { job: any }) {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/v1/jobs/${job.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Job updated!");
        router.push(`/jobs/${job.id}`);
      } else {
        toast.error("Failed to update job");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <JobForm job={job} onSubmit={onSubmit} />;
}
