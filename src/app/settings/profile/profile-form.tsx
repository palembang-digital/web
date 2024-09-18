"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertUserSchema } from "@/db/schema";
import { toast } from "sonner";

export default function ProfileForm({ user }: { user: any }) {
  return (
    <AutoForm
      values={user}
      formSchema={insertUserSchema}
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
            toast.success("Profile updated!");
          } else {
            toast.error("Failed to update profile data");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit>Simpan</AutoFormSubmit>
    </AutoForm>
  );
}
