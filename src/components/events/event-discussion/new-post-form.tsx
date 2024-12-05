"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertFeedSchema } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function NewPostForm({
  session,
  event,
}: {
  session: any;
  event: any;
}) {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <AutoForm
      className="space-y-2"
      formSchema={insertFeedSchema}
      values={values}
      fieldConfig={{
        content: {
          fieldType: "textarea",
          inputProps: {
            placeholder:
              "Ada pertanyaan? Diskusikan dengan panitia atau peserta lain",
            showLabel: false,
          },
        },
      }}
      onSubmit={async (data) => {
        setLoading(true);

        const requestData = {
          user: session.user,
          content: data.content,
        };

        try {
          const response = await fetch(
            `/api/v1/events/${event.id}/discussion`,
            {
              method: "POST",
              body: JSON.stringify(requestData),
              headers: {
                "content-type": "application/json",
              },
            }
          );

          if (response.ok) {
            toast.success("Discussion posted!");
            router.push(`/events/${event.id}`);
            setLoading(false);
            setValues({ content: undefined });
            mutate(`/api/v1/events/${event.id}/discussion`);
          } else {
            setLoading(false);
            toast.error("Failed to post discussion");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <AutoFormSubmit disabled={loading}>Kirim</AutoFormSubmit>
    </AutoForm>
  );
}
