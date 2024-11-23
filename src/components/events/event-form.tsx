"use client";

import { UploadWidget } from "@/components/cloudinary/upload-widget";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { insertEventSchema } from "@/db/schema";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel } from "../ui/form";

export default function EventForm({
  event,
  onSubmit,
}: {
  event: any;
  onSubmit: (data: any) => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState(event);

  const [speakers, setSpeakers] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [hostsUsers, setHostsUsers] = useState([]);
  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        const users = data.map((user: any) => ({
          value: user.id,
          label: user.name,
        }));

        setSpeakers(users);
        setCommittees(users);
        setHostsUsers(users);
      });
  }, []);

  const [hostsOrganizations, setHostsOrganizations] = useState([]);
  useEffect(() => {
    fetch("/api/v1/organizations")
      .then((res) => res.json())
      .then((data) => {
        setHostsOrganizations(
          data.map((org: any) => ({
            value: org.id,
            label: org.name,
          }))
        );
      });
  }, []);

  const [selectedSpeakers, setSelectedSpeakers] = useState(
    event.eventsSpeakers
      ? event.eventsSpeakers
          .map((es: any) => ({
            value: es.userId,
            label: es.user.name,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label))
      : []
  );

  const [selectedCommittees, setSelectedCommittees] = useState(
    event.eventsCommittees
      ? event.eventsCommittees
          .map((es: any) => ({
            value: es.userId,
            label: es.user.name,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label))
      : []
  );

  const [selectedHostsOrganizations, setSelectedHostsOrganizations] = useState(
    event.eventsHostsOrganizations
      ? event.eventsHostsOrganizations
          .map((es: any) => ({
            value: es.organizationId,
            label: es.organization.name,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label))
      : []
  );

  const [selectedHostsUsers, setSelectedHostsUsers] = useState(
    event.eventsHostsUsers
      ? event.eventsHostsUsers
          .map((es: any) => ({
            value: es.userId,
            label: es.user.name,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label))
      : []
  );

  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState(
    event.eventsVideos
      ? event.eventsVideos
          .map((es: any) => ({
            value: es.videoId,
            label: es.video.title,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label))
      : []
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
      {values.imageUrl && (
        <Image
          src={values.imageUrl}
          alt={values.name}
          width={400}
          height={200}
          className="mb-5"
        />
      )}

      <div className="mb-5">
        <UploadWidget
          uploadPreset="patal-v2-events"
          onSuccess={(results) => {
            const imageUrl = (results.info as CloudinaryUploadWidgetInfo)
              .secure_url;
            setValues({ ...values, imageUrl: imageUrl });
          }}
        />
      </div>

      <AutoForm
        values={values}
        formSchema={insertEventSchema}
        fieldConfig={{
          description: {
            fieldType: "richtextarea",
          },
          locationType: {
            label: "Location Type (offline, online, or hybrid)",
          },
          registrationUrlType: {
            label: "Registration URL Type (internal or external)",
          },
        }}
        onSubmit={async (data) => {
          const requestData = {
            event: data,
            speakers: selectedSpeakers,
            committees: selectedCommittees,
            hostsOrganizations: selectedHostsOrganizations,
            hostsUsers: selectedHostsUsers,
            videos: selectedVideos,
          };

          await onSubmit(requestData);
        }}
      >
        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
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
        </div>

        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>Committees</FormLabel>
            <FormControl>
              <MultiSelect
                options={committees}
                placeholder="Pilih panitia"
                selected={selectedCommittees}
                setSelected={setSelectedCommittees}
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>Hosts (Organizations)</FormLabel>
            <FormControl>
              <MultiSelect
                options={hostsOrganizations}
                placeholder="Pilih organisasi yang menjadi host"
                selected={selectedHostsOrganizations}
                setSelected={setSelectedHostsOrganizations}
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="flex flex-row  items-center space-x-2">
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel>Hosts (Users)</FormLabel>
            <FormControl>
              <MultiSelect
                options={hostsUsers}
                placeholder="Pilih member yang menjadi host"
                selected={selectedHostsUsers}
                setSelected={setSelectedHostsUsers}
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
                placeholder="Pilih video"
                selected={selectedVideos}
                setSelected={setSelectedVideos}
              />
            </FormControl>
          </FormItem>
        </div>
        <AutoFormSubmit>Simpan</AutoFormSubmit>
      </AutoForm>
      <Button variant="link" onClick={() => router.push(`/events/${event.id}`)}>
        Cancel
      </Button>
    </>
  );
}
