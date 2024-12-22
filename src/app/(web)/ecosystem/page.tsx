import { columns } from "@/app/(web)/ecosystem/columns";
import { DataTable } from "@/app/(web)/ecosystem/data-table";
import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekosistem",
};

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
