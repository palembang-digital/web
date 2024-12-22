import { OpenGraphImage } from "@/components/og-image";
import { getUser } from "@/services";
import { ImageResponse } from "next/og";

export async function GET(
  _: any,
  { params }: { params: { username: string } }
) {
  const username = params.username.startsWith("%40")
    ? params.username.slice(3)
    : params.username;

  const user = await getUser(username);
  if (!user) {
    return new ImageResponse(<></>, { status: 404 });
  }

  return new ImageResponse(
    (
      <OpenGraphImage
        title={user.name ? user.name : user.username}
        description={user.bio ? user.bio : ""}
        url={user.username}
        // eslint-disable-next-line @next/next/no-img-element
        icon={user.image ? <img src={user.image} alt="" width={100} /> : null}
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
