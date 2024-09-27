"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertFeedSchema } from "@/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewPostForm() {
  const router = useRouter();

  return (
    <AutoForm
      formSchema={insertFeedSchema}
      fieldConfig={{
        content: {
          fieldType: "richtextarea",
        },
      }}
      onSubmit={async (data) => {
        const requestData = {
          feed: data,
        };

        try {
          const response = await fetch(`/api/v1/feeds`, {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.ok) {
            toast.success("Post created!");
            router.push(`/for-you`);
          } else {
            toast.error("Failed to post");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit>Post</AutoFormSubmit>
    </AutoForm>
  );
}
