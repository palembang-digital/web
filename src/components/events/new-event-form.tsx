"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventForm from "./event-form";

export default function NewEventForm() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/v1/events`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Event created!");
        router.push(`/events`);
      } else {
        toast.error("Failed to create event");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <EventForm event={{}} onSubmit={onSubmit} />;
}
