import DefaultCertificate from "@/components/certificates/default-certificate";
import SDC2024 from "@/components/certificates/sdc-2024";
import { db } from "@/db";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
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

  let template = (
    <DefaultCertificate
      recipient={cert.user.name || cert.user.username}
      role={cert.role}
      event={cert.event.name}
      startDate={cert.event.scheduledStart}
      endDate={cert.event.scheduledEnd}
      signatures={[
        { name: "Arief Rahmansyah", position: "Ketua Palembang Digital" },
      ]}
    />
  );
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
