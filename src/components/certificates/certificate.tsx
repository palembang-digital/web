/* eslint-disable @next/next/no-img-element */
"use client";

import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
} from "@/components/ui/typography";
import { forwardRef } from "react";

interface CertificateSignature {
  name: string;
  position: string;
  signature: string;
}

interface CertificateProps {
  certificateCode: string;
  certificateTitle: string;
  eventName: string;
  recipientName: string;
  startDate: string;
  endDate: string;
  signatures: CertificateSignature[];
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  (
    {
      eventName,
      recipientName,
      startDate,
      endDate,
      signatures,
      certificateCode,
      certificateTitle,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className="bg-slate-100 px-10 py-10 relative">
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-slate-200 z-0"></div>

        <div className="bg-white border p-8 relative shadow-sm align-middle">
          <img
            className="absolute top-0 right-0"
            src="/certificate-watermark.png"
            alt="Palembang Digital Watermark"
            width={150}
          />
          <div className="flex items-center gap-x-4 mb-4 h-[30px]">
            <img
              src="/logo-black-bg.png"
              alt="Palembang Digital"
              width={30}
              height={30}
            />
            <TypographyLarge>Palembang Digital</TypographyLarge>
          </div>

          <TypographyH2 className="mb-4">{certificateTitle}</TypographyH2>
          <TypographyLead className="text-sm mb-4">
            Diberikan kepada
          </TypographyLead>

          <TypographyH3 className="text-md mb-4">{recipientName}</TypographyH3>

          <TypographyLead className="text-sm mb-4">
            atas partisipasinya sebagai pembicara pada kegiatan:
          </TypographyLead>
          <div className="px-4 py-2 mb-4 bg-black w-max rounded-md align-middle">
            <TypographyH4 className="text-white text-sm">
              {eventName}
            </TypographyH4>
          </div>
          <TypographyLead className="text-sm mb-4">
            pada tanggal {startDate}
            {endDate && ` sampai ${endDate}`}.
          </TypographyLead>

          <div className="flex items-center gap-x-6 mt-8 pt-1 w-max">
            {signatures.map((signature) => (
              <div key={signature.name} className="flex items-center gap-x-4">
                <div>
                  <TypographyLarge className="text-sm">
                    {signature.name}
                  </TypographyLarge>
                  <TypographyLead className="text-xs">
                    {signature.position}
                  </TypographyLead>
                </div>
                {/* <Image
              src={signature.signature}
              alt={signature.name}
              width={100}
              height={100}
              loading="lazy"
            /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";

export default Certificate;
