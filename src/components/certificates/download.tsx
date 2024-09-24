"use client";

import Certificate, {
  CertificateProps,
} from "@/components/certificates/certificate";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/lib/image";
import { useCallback, useRef } from "react";

function CerticateDownload({
  eventName,
  recipientName,
  role,
  startDate,
  endDate,
  signatures,
  certificateCode,
  certificateTitle,
}: CertificateProps) {
  const refCertificate = useRef<HTMLDivElement>(null);

  const checkGenerated = useCallback(async () => {
    await downloadImage(refCertificate, `${eventName}.png`);
  }, []);

  return (
    <div>
      <div className="overflow-auto">
        <Certificate
          ref={refCertificate}
          certificateCode={certificateCode}
          certificateTitle={certificateTitle}
          eventName={eventName}
          recipientName={recipientName}
          role={role}
          startDate={startDate}
          endDate={endDate}
          signatures={[
            {
              name: "Doremi",
              position: "Ketua",
              signature: "signature",
            },
            {
              name: "Fasolasido",
              position: "Wakil Ketua",
              signature: "signature",
            },
          ]}
        />
      </div>
      <Button onClick={checkGenerated} className="mt-5">
        Download Certificate
      </Button>
    </div>
  );
}

export default CerticateDownload;
