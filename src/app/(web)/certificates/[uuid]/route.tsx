import DefaultCertificate from "@/components/certificates/default-certificate";
import SDC2024 from "@/components/certificates/sdc-2024";
import { db } from "@/db";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import QRCode from "qrcode";

const size = {
  width: 1123,
  height: 794,
};

const defaultSignatures = [
  { name: "Arief Rahmansyah", position: "Ketua Palembang Digital" },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const minimal = searchParams.get("minimal") === "true";

  const cert = await db.query.certificates.findFirst({
    where: (certificates, { eq }) => eq(certificates.id, params.uuid),
    with: {
      user: {
        columns: { name: true, username: true },
      },
      event: {
        columns: {
          name: true,
          scheduledStart: true,
          scheduledEnd: true,
          locationType: true,
          locationName: true,
        },
      },
    },
  });

  if (!cert) {
    return new ImageResponse(<p>Certificate not found</p>, {
      ...size,
    });
  }

  const qrCodeDataURL = await QRCode.toDataURL(
    "https://www.palembangdigital.org/certificates/" + cert.id
  );

  let template = (
    <DefaultCertificate
      certificateUUID={cert.id}
      recipient={cert.user.name || cert.user.username}
      role={cert.role}
      event={cert.event.name}
      startDate={cert.event.scheduledStart}
      endDate={cert.event.scheduledEnd}
      locationName={
        cert.event.locationType === "offline" && cert.event.locationName
          ? cert.event.locationName
          : ""
      }
      signatures={cert.signatures ? cert.signatures : defaultSignatures}
      qrCodeDataURL={qrCodeDataURL}
    />
  );
  if (cert.template === "sdc-2024") {
    template = (
      <SDC2024
        recipient={cert.user.name || cert.user.username}
        role={cert.role}
        minimal={minimal}
      />
    );
  }

  if (!template) {
    return new ImageResponse(<p>Certificate template not found</p>, {
      ...size,
    });
  }

  return new ImageResponse(template, {
    ...size,
  });
}
