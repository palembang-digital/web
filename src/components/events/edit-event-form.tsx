"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventForm from "./event-form";

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Event updated!");
        router.push(`/events/${event.id}`);
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <EventForm event={event} onSubmit={onSubmit} />;
}
