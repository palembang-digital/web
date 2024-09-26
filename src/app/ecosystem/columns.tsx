"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { selectOrganizationSchema } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type selectOrganizationSchema = {};

export const columns: ColumnDef<selectOrganizationSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama Organisasi"
        showHideColumn={false}
        className="ml-4"
      />
    ),
    cell: ({ row }) => {
      const org = selectOrganizationSchema.parse(row.original);

      return (
        <div className="flex items-center space-x-4 ml-2">
          <Avatar className="rounded-md h-10 w-10 sm:h-16 sm:w-16">
            <AvatarImage src={org.image || ""} />
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{org.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "organizationType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Organisasi"
        showHideColumn={false}
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="capitalize">{row.getValue("organizationType")}</span>
      );
    },
    meta: {
      filterVariant: "text",
    },
  },
  {
    id: "links",
    header: () => <span className="text-xs">Links</span>,
    cell: ({ row }) => {
      const org = selectOrganizationSchema.parse(row.original);

      return org.website ? (
        <Link href={org.website} target="_blank">
          {org.website}
        </Link>
      ) : (
        ""
      );
    },
  },
];
