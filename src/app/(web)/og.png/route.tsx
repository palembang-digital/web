import { OpenGraphImage } from "@/components/og-image";
import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <OpenGraphImage
        title="Komunitas Kolaborasi"
        description="Dari wong kito, untuk wong kito!"
        url=""
        icon={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="https://www.palembangdigital.org/logo-black-bg.png"
            alt=""
            width={100}
          />
        }
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
