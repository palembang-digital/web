import { columns } from "@/app/ecosystem/columns";
import { DataTable } from "@/app/ecosystem/data-table";
import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ekosistem",
};

function OrganizationList({ orgs }: { orgs: any }) {
  return (
    <div>
      {orgs.map((org: any) => (
        <div
          key={org.id}
          className="flex items-center justify-between p-4 border-b"
        >
          <div className="flex items-center gap-4">
            <Image
              src={org.image || ""}
              alt={org.name}
              width={128}
              height={128}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{org.name}</h3>
              <p className="text-sm text-neutral-500">{org.organizationType}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  const orgs = await db.query.organizations.findMany({
    orderBy: (organizations, { asc }) => [asc(organizations.name)],
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Ekosistem" />
      <div className="content-wrapper">
        <div className="content">
          <DataTable columns={columns} data={orgs} />
        </div>
      </div>
    </ScrollArea>
  );
}
