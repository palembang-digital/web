import { OpenGraphImage } from "@/components/og-image";
import { localeDate } from "@/lib/utils";
import { getEvent } from "@/services";
import { ImageResponse } from "next/og";

// export const size = {
//   width: sharedMetadata.ogImage.width,
//   height: sharedMetadata.ogImage.height,
// };

// export async function generateStaticParams() {
//   const allPosts = await getAllPostSlugs();
//   return allPosts.map((post) => ({ slug: post.slug }));
// }

export async function GET(_: any, { params }: { params: { id: number } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return null;
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
    )
  );
}
