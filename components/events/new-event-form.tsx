"use client";

import AutoForm from "@/components/ui/auto-form";
import { insertEventSchema } from "@/db/schema";

export default function NewEventForm() {
  return <AutoForm formSchema={insertEventSchema} />;
}
