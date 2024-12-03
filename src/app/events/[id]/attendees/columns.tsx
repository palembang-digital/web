"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type attendeeSchema = {
  name: string;
  image: string;
  username: string;
};

export const columns: ColumnDef<attendeeSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama"
        showHideColumn={false}
        className="ml-4"
      />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Link
          className="flex items-center space-x-4 ml-2"
          href={`/${user.username}`}
        >
          <Avatar className="rounded-full h-10 w-10 sm:h-16 sm:w-16">
            <AvatarImage src={user.image || ""} />
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{user.name}</p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Username"
        showHideColumn={false}
        className="ml-4"
      />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Link className="text-sm leading-none" href={`/${user.username}`}>
          {user.username}
        </Link>
      );
    },
  },
];
