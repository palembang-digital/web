"use client";

import Certificate, {
  CertificateProps,
} from "@/components/certificates/certificate";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/lib/canvas";
import { useCallback, useRef } from "react";

function CeriticateDownload({
  eventName,
  recipientName,
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

export default CeriticateDownload;
