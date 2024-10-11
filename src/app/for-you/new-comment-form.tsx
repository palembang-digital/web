"use client";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { insertFeedCommentSchema } from "@/db/schema";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function NewCommentForm({
  feedId,
}: Readonly<{ feedId: number }>) {
  const { mutate } = useSWRConfig();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <AutoForm
      values={values}
      formSchema={insertFeedCommentSchema}
      fieldConfig={{
        comment: {
          inputProps: {
            placeholder: "Tambahkan komentar...",
            showLabel: false,
          },
          renderParent: ({ children }) => (
            <div className="flex items-end gap-3">
              <div className="flex-1">{children}</div>
              <div>
                <Button disabled={loading} type="submit">
                  Kirim
                </Button>
              </div>
            </div>
          ),
        },
      }}
      onSubmit={async (data) => {
        setLoading(true);

        const requestData = {
          comment: data,
        };

        try {
          const response = await fetch(`/api/v1/feeds/${feedId}/comments`, {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.ok) {
            toast.success("Coment sent!");
            setLoading(false);
            setValues({ comment: undefined });
            mutate(`/api/v1/feeds/${feedId}/comments`);
          } else {
            toast.error("Failed to send comment");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    ></AutoForm>
  );
}
