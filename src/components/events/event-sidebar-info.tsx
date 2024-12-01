import EventCommittees from "@/components/events/event-committees";
import SpeakersList from "@/components/speakers-list";
import { TypographyH4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function EventSidebarInfo({
  event,
  className,
}: {
  event: any;
  className?: string;
}) {
  return (
    <div className={cn("gap-4", className)}>
      {event.eventsSpeakers.length > 0 && (
        <SpeakersList speakers={event.eventsSpeakers} />
      )}
      {(event.eventsHostsOrganizations.length > 0 ||
        event.eventsHostsUsers.length > 0) && (
        <div>
          <TypographyH4>Hosts</TypographyH4>
          {event.eventsHostsOrganizations.map(
            ({ organization }: { organization: any }) => (
              <div key={organization.id} className="flex items-center my-4">
                <Image
                  src={organization.image || ""}
                  alt={organization.name || ""}
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
                <p className="ml-2 text-sm">{organization.name}</p>
              </div>
            )
          )}
          {event.eventsHostsUsers.map((user: any) => (
            <Link
              href={`/${user.user.username}`}
              key={user.user.id}
              className="flex items-center my-4 hover:underline"
            >
              <Image
                src={user.user.image || ""}
                alt={user.user.name || ""}
                width={24}
                height={24}
                className="rounded-full"
              />
              <p className="ml-2 text-sm">{user.user.name}</p>
            </Link>
          ))}
        </div>
      )}
      {(event.eventsSponsorsOrganizations.length > 0 ||
        event.eventsSponsorsUsers.length > 0) && (
        <div>
          <TypographyH4>Sponsors</TypographyH4>
          {event.eventsSponsorsOrganizations.map(
            ({ organization }: { organization: any }) => (
              <div key={organization.id} className="flex items-center my-4">
                <Image
                  src={organization.image || ""}
                  alt={organization.name || ""}
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
                <p className="ml-2 text-sm">{organization.name}</p>
              </div>
            )
          )}
          {event.eventsSponsorsUsers.map((user: any) => (
            <Link
              href={`/${user.user.username}`}
              key={user.user.id}
              className="flex items-center my-4 hover:underline"
            >
              <Image
                src={user.user.image || ""}
                alt={user.user.name || ""}
                width={24}
                height={24}
                className="rounded-full"
              />
              <p className="ml-2 text-sm">{user.user.name}</p>
            </Link>
          ))}
        </div>
      )}
      {event.eventsCommittees.length > 0 && (
        <EventCommittees committees={event.eventsCommittees} />
      )}
    </div>
  );
}

export default EventSidebarInfo;
