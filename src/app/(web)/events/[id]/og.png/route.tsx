import { OpenGraphImage } from "@/components/og-image";
import { localeDate } from "@/lib/utils";
import { getEvent } from "@/services";
import { ImageResponse } from "next/og";

export async function GET(_: any, { params }: { params: { id: number } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return new ImageResponse(<></>, { status: 404 });
  }

  return new ImageResponse(
    (
      <OpenGraphImage
        title={event.name}
        description={`🗓️ ${localeDate(event.scheduledStart)}${
          event.scheduledEnd &&
          localeDate(event.scheduledStart) !== localeDate(event.scheduledEnd)
            ? " - " + localeDate(event.scheduledEnd)
            : ""
        }`}
        url="events"
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
