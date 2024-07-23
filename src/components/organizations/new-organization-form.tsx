"use client";

import { UploadWidget } from "@/components/cloudinary/upload-widget";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertOrganizationSchema } from "@/db/schema";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewOrganizationForm({
  organization,
}: {
  organization?: any;
}) {
  const router = useRouter();
  const [values, setValues] = useState(organization);

  return (
    <div className="flex flex-col gap-4">
      {values && (
        <Image src={values.image} alt={values.image} width={400} height={200} />
      )}

      <UploadWidget
        uploadPreset="patal-v2-events"
        onSuccess={(results) => {
          const imageUrl = (results.info as CloudinaryUploadWidgetInfo)
            .secure_url;
          setValues({ ...values, image: imageUrl });
        }}
      />

      <AutoForm
        formSchema={insertOrganizationSchema}
        values={values}
        onSubmit={async (data) => {
          const requestData = {
            organization: data,
          };

          try {
            const response = await fetch(`/api/v1/organizations`, {
              method: "POST",
              body: JSON.stringify(requestData),
              headers: {
                "content-type": "application/json",
              },
            });

            if (response.ok) {
              toast("Organization created!");
              router.push(`/ecosystem`);
            } else {
              alert("Failed to create organization");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <AutoFormSubmit>Tambah</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
