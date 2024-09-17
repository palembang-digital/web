"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { getYoutubeVideoId } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditVideoForm({ video }: { video: any }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: video,
  });

  async function onSubmit(data: any) {
    const requestData = {
      video: data,
      speakers: selectedSpeakers,
      events: selectedEvents,
    };

    try {
      const response = await fetch(`/api/v1/videos/${video.id}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Video updated!");
        router.push(`/videos/${video.id}`);
      } else {
        toast.error("Failed to update video");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState(
    video.videosSpeakers
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

  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(
    video.eventsVideos
      .map((ev: any) => ({
        value: ev.event.id,
        label: ev.event.name,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
  );
  useEffect(() => {
    fetch("/api/v1/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(
          data.map((event: any) => ({
            value: event.id,
            label: event.name,
          }))
        );
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul video</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube URL</FormLabel>
              <FormControl>
                <>
                  <Input {...field} />
                  {field.value && (
                    <YouTubeEmbed
                      videoid={getYoutubeVideoId(field.value)}
                      style="border-radius: 8px"
                    />
                  )}
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi video</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="videosSpeakers"
          render={() => (
            <FormItem>
              <FormLabel>Speakers</FormLabel>
              <FormControl>
                <MultiSelect
                  options={speakers}
                  placeholder="Pilih speaker"
                  selected={selectedSpeakers}
                  setSelected={setSelectedSpeakers}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="eventsVideos"
          render={() => (
            <FormItem>
              <FormLabel>Kegiatan</FormLabel>
              <FormControl>
                <MultiSelect
                  options={events}
                  placeholder="Pilih event"
                  selected={selectedEvents}
                  setSelected={setSelectedEvents}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
