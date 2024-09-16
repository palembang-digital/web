"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertContactFormSchema } from "@/db/schema";
import { toast } from "sonner";

export function ContactForm() {
  return (
    <AutoForm
      formSchema={insertContactFormSchema}
      fieldConfig={{
        message: {
          fieldType: "textarea",
        },
      }}
      onSubmit={async (data) => {
        try {
          const response = await fetch(`/api/v1/contacts`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.ok) {
            toast.success(
              "Thank you for your message! We'll get back to you shortly :)"
            );
          } else {
            toast.error("Failed to send message");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit>Kirim</AutoFormSubmit>
    </AutoForm>
  );
}
