"use client";

import { downloadImage } from "@/lib/canvas";
import { useCallback, useId, useRef } from "react";
import Certificate from "./certificate";

function DownloadTest() {
  const refCertificate = useRef<HTMLDivElement>(null);

  const checkGenerated = useCallback(async () => {
    await downloadImage(refCertificate, "certificate.png");
  }, []);

  const id = useId();

  return (
    <div>
      <Certificate
        ref={refCertificate}
        id={id}
        certificateCode="SDS-2024-001"
        certificateTitle="Sertifikat Apresiasi"
        eventName="Sriwijaya Digital Startup"
        recipientName="Budi Pekerti"
        startDate="20 Juni 2024"
        endDate="22 Juni 2024"
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
      <button onClick={checkGenerated}>Download Certificate</button>
    </div>
  );
}

export default DownloadTest;
