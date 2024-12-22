"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { ComponentType } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const organizationTypes: {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}[] = [
  { label: "Community", value: "community" },
  { label: "Government", value: "government" },
  { label: "Research Lab", value: "research lab" },
  { label: "Startup", value: "startup" },
  { label: "Student Community", value: "student community" },
  { label: "University", value: "university" },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Link href="/ecosystem/new">
          <Button variant="outline" className="h-8 px-2 lg:px-3 text-xs">
            <PlusCircleIcon className="h-3 w-3 mr-2" />
            Tambah
          </Button>
        </Link>
        <Input
          placeholder="Filter organisasi..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("organizationType") && (
          <DataTableFacetedFilter
            column={table.getColumn("organizationType")}
            title="Jenis Organisasi"
            options={organizationTypes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 text-xs"
          >
            Reset
            <Cross2Icon className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
