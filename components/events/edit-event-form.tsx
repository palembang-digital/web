"use client";

import { UploadWidget } from "@/components/cloudinary/upload-widget";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { insertEventSchema } from "@/db/schema";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter();
  const { toast } = useToast();

  const [values, setValues] = useState(event);

  return (
    <>
      <Image src={values.imageUrl} alt={values.name} width={400} height={200} />

      <UploadWidget
        uploadPreset="patal-v2-events"
        onSuccess={(results) => {
          const imageUrl = (results.info as CloudinaryUploadWidgetInfo)
            .secure_url;
          setValues({ ...values, imageUrl: imageUrl });
        }}
      />

      <AutoForm
        formSchema={insertEventSchema}
        values={values}
        onSubmit={async (data) => {
          try {
            const response = await fetch(`/api/events/${event.id}`, {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
              },
            });
            console.log(response);

            if (response.ok) {
              toast({ title: "Event successfully updated!" });
              router.push(`/events/${event.id}`);
            } else {
              alert("Failed to update event");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <AutoFormSubmit>Save</AutoFormSubmit>
      </AutoForm>
      <Button variant="link" onClick={() => router.push(`/events/${event.id}`)}>
        Cancel
      </Button>
    </>
  );
}
