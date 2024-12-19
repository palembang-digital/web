"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";

import { UploadWidget } from "@/components/cloudinary/upload-widget";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { insertUserSchema } from "@/db/schema";

export default function ProfileForm({ user }: { user: any }) {
  const [imageUrl, setImageUrl] = useState(user.image);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setImageUrl(user.image);
  }, [user.image]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4">
        <div className="relative size-24">
          <Image
            src={imageUrl}
            alt={user.username}
            fill
            className="rounded-full size-full object-cover"
          />
        </div>

        <div className="w-max">
          <UploadWidget
            label="Change Photo"
            uploadPreset="patal-v2-events"
            onSuccess={(results) => {
              const uploadedImageUrl = (
                results.info as CloudinaryUploadWidgetInfo
              ).secure_url;
              setImageUrl(uploadedImageUrl);
            }}
          />
        </div>
      </div>
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
            setIsSubmitting(true);
            const response = await fetch(`/api/v1/users/${user.id}`, {
              method: "PUT",
              body: JSON.stringify({ ...data, image: imageUrl }),
              headers: {
                "content-type": "application/json",
              },
            });

            if (response.ok) {
              toast.success("Profile updated!");
              window.location.reload();
            } else {
              toast.error("Failed to update profile data");
            }
          } catch (error) {
            console.error(error);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {(formState) => (
          <AutoFormSubmit
            disabled={
              formState.isSubmitting || formState.isLoading || isSubmitting
            }
          >
            Simpan
          </AutoFormSubmit>
        )}
      </AutoForm>
    </div>
  );
}
