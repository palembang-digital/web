"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { onboardingSchema } from "@/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OnboardingForm({ user }: { user: any }) {
  const router = useRouter();

  return (
    <AutoForm
      formSchema={onboardingSchema}
      values={user}
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
            toast("You are onboarded! Have fun!");
            router.push(`/`);
          } else {
            alert("Failed to update user data");
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
