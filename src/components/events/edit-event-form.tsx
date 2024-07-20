"use client";

import { UploadWidget } from "@/components/cloudinary/upload-widget";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { insertEventSchema } from "@/db/schema";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { MultiSelect } from "../ui/multi-select";

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter();
  const [values, setValues] = useState(event);

  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState(
    event.eventsSpeakers
      .map((es: any) => ({
        value: es.userId,
        label: es.user.name,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
  );
  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        setSpeakers(
          data.map((user: any) => ({
            value: user.id,
            label: user.name,
          }))
        );
      });
  }, []);

  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(
    event.eventsVideos
      .map((es: any) => ({
        value: es.videoId,
        label: es.video.title,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
  );
  useEffect(() => {
    fetch("/api/v1/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(
          data.map((video: any) => ({
            value: video.id,
            label: video.title,
          }))
        );
      });
  }, []);

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
          const requestData = {
            event: data,
            speakers: selectedSpeakers,
            videos: selectedVideos,
          };

          try {
            const response = await fetch(`/api/v1/events/${event.id}`, {
              method: "PUT",
              body: JSON.stringify(requestData),
              headers: {
                "content-type": "application/json",
              },
            });

            if (response.ok) {
              toast("Event updated!");
              router.push(`/events/${event.id}`);
            } else {
              alert("Failed to update event");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>Speakers</FormLabel>
            <FormControl>
              <MultiSelect
                options={speakers}
                placeholder="Pilih speaker(s)"
                selected={selectedSpeakers}
                setSelected={setSelectedSpeakers}
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>Videos</FormLabel>
            <FormControl>
              <MultiSelect
                options={videos}
                placeholder="Pilih video(s)"
                selected={selectedVideos}
                setSelected={setSelectedVideos}
              />
            </FormControl>
          </FormItem>
        </div>
        <AutoFormSubmit>Save</AutoFormSubmit>
      </AutoForm>
      <Button variant="link" onClick={() => router.push(`/events/${event.id}`)}>
        Cancel
      </Button>
    </>
  );
}
