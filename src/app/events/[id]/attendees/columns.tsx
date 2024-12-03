"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type attendeeSchema = {
  id: string;
  name: string;
  image: string;
  username: string;
  rsvp: string;
  attended: boolean;
  canUpdateAttendance: boolean;
  eventId: number;
};

export const updateAttendance = async (
  eventId: number,
  userId: string,
  name: string,
  rsvp: string,
  attended: boolean
) => {
  const requestData = {
    user: {
      id: userId,
    },
    rsvp: rsvp,
    attended: attended,
  };

  try {
    const response = await fetch(`/api/v1/events/${eventId}/attendance`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      toast.success(`${name}'s attendance updated`);
    } else {
      toast.error("Failed to update ${name}'s attendance");
    }
  } catch (error) {
    console.error(error);
  }
};

export function AttendanceSwitch({ row }: { row: any }) {
  const data = row.original;
  const [isAttending, setIsAttending] = useState(data.attended);

  return (
    <Switch
      id="is-attending"
      disabled={!data.canUpdateAttendance}
      checked={isAttending}
      onCheckedChange={(e) => {
        updateAttendance(data.eventId, data.id, data.name, data.rsvp, e);
        setIsAttending(e);
      }}
    />
  );
}

export const columns: ColumnDef<attendeeSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        showHideColumn={false}
        className="ml-4"
      />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Link
          className="flex items-center space-x-4 ml-2"
          href={`/${data.username}`}
        >
          <Avatar className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={data.image || ""} />
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-none">{data.name}</p>
            <p className="text-xs font-normal leading-none">{data.username}</p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "attended",
    // header: () => <p className="text-xs">Is attending?</p>,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Is attending?"
        showHideColumn={false}
      />
    ),
    cell: ({ row }) => <AttendanceSwitch row={row} />,
  },
];
