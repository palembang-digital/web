"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { onboardingSchema } from "@/db/schema";
import { toast } from "sonner";

export default function OnboardingForm({ user }: { user: any }) {
  return (
    <AutoForm
      values={user}
      formSchema={onboardingSchema}
      fieldConfig={{
        bio: {
          fieldType: "textarea",
        },
      }}
      onSubmit={async (data) => {
        try {
          const response = await fetch(`/api/v1/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.ok) {
            toast.success("You are onboarded! Have fun!");
            setTimeout(() => {
              location.href = "/";
            }, 2000);
          } else {
            toast.error("Failed to update user data");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit>Mulai</AutoFormSubmit>
    </AutoForm>
  );
}
