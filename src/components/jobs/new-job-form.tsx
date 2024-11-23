"use client";

import JobForm from "@/components/jobs/job-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewJobForm() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/v1/jobs`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Job created!");
        router.push(`/jobs`);
      } else {
        toast.error("Failed to create job");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <JobForm job={{}} onSubmit={onSubmit} />;
}
