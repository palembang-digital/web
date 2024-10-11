"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertFeedSchema } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function NewPostForm() {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <AutoForm
      formSchema={insertFeedSchema}
      values={values}
      fieldConfig={{
        content: {
          fieldType: "textarea",
          inputProps: {
            placeholder: "How's your day?",
            showLabel: false,
          },
        },
      }}
      onSubmit={async (data) => {
        setLoading(true);

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
            setLoading(false);
            setValues({ content: undefined });
            mutate("/api/v1/feeds");
          } else {
            toast.error("Failed to post");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit disabled={loading}>Post</AutoFormSubmit>
    </AutoForm>
  );
}
