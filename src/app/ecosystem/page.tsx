import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import Image from "next/image";

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
              width={48}
              height={48}
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

  const defaultOrgType = "semua";
  const orgTypes = orgs
    .map((org) => org.organizationType)
    .sort((a, b) => (a !== null && b !== null ? (a > b ? 1 : -1) : 0));
  // @ts-ignore
  const uniqueOrgTypes = [defaultOrgType, ...new Set(orgTypes)];

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Ekosistem" />
      <div className="content-wrapper">
        <div className="content">
          <Tabs defaultValue={defaultOrgType}>
            <TabsList className="w-full">
              {uniqueOrgTypes.map((orgType) => (
                <TabsTrigger
                  key={orgType}
                  value={orgType}
                  className="capitalize"
                >
                  {orgType}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={defaultOrgType}>
              <OrganizationList orgs={orgs} />
            </TabsContent>
            {uniqueOrgTypes.map((orgType) => (
              <TabsContent key={orgType} value={orgType}>
                <OrganizationList
                  orgs={orgs.filter((org) => org.organizationType === orgType)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
