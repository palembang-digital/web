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
import { getYoutubeVideoId } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";

export default function EditVideoForm({ video }: { video: any }) {
  const form = useForm({
    defaultValues: video,
  });

  function onSubmit(data: any): any {
    const requestData = {
      video: data,
      speakers: selectedSpeakers,
    };
    console.log("requestData", requestData);
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kegiatan</FormLabel>
              <FormControl></FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
