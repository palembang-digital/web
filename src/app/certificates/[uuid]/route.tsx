import SDC2024 from "@/components/certificates/sdc-2024";
import { db } from "@/db";
import { ImageResponse } from "next/og";

export async function GET(_: any, { params }: { params: { uuid: string } }) {
  const cert = await db.query.certificates.findFirst({
    where: (certificates, { eq }) => eq(certificates.id, params.uuid),
    with: {
      user: {
        columns: { name: true, username: true },
      },
      event: {
        columns: { name: true, scheduledStart: true, scheduledEnd: true },
      },
    },
  });

  if (!cert) {
    return new ImageResponse(<p>Certificate not found</p>, {
      width: 1123,
      height: 794,
    });
  }

  let template = null;
  if (cert.template === "sdc-2024") {
    template = (
      <SDC2024
        recipient={cert.user.name || cert.user.username}
        role={cert.role}
      />
    );
  }

  if (!template) {
    return new ImageResponse(<p>Certificate template not found</p>, {
      width: 1123,
      height: 794,
    });
  }

  return new ImageResponse(template, {
    width: 1123,
    height: 794,
  });
}
