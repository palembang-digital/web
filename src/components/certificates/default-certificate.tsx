import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
} from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";

export default function DefaultCertificate({
  recipient,
  role,
  event,
  startDate,
  endDate,
  signatures,
}: {
  recipient: string;
  role: string;
  event: string;
  startDate: Date;
  endDate?: Date;
  signatures?: { name: string; position: string }[];
}) {
  return (
    <div tw="flex w-full h-full items-center justify-center bg-slate-100">
      <div tw="absolute bottom-0 left-0 w-full h-1/4 bg-slate-200 z-0"></div>

      <div tw="flex p-20">
        <div tw="flex flex-col bg-white border p-8 relative shadow-sm align-middle w-full">
          <img
            tw="absolute top-0 right-0"
            src="http://localhost:3000/certificate-watermark.png"
            alt="Palembang Digital Watermark"
            width={150}
          />

          <div tw="flex items-center gap-x-8 mb-4 h-[30px]">
            <img
              src="http://localhost:3000/logo-black-bg.png"
              alt="Palembang Digital"
              width={30}
              height={30}
              tw="mr-2"
            />
            <TypographyLarge>Palembang Digital</TypographyLarge>
          </div>

          <TypographyH2 className="mb-4">Sertifikat Apresiasi</TypographyH2>
          <TypographyLead className="text-sm mb-4">
            Diberikan kepada
          </TypographyLead>

          <TypographyH3 className="text-md mb-4 inline-block">
            {recipient}
          </TypographyH3>

          <TypographyLead className="text-sm mb-4">
            atas partisipasinya sebagai {role} pada kegiatan:
          </TypographyLead>
          <div tw="flex px-4 py-2 mb-4 rounded-md align-middle">
            <TypographyH4 className="text-sm">{event}</TypographyH4>
          </div>

          <TypographyLead className="text-sm mb-4">
            pada tanggal {localeDate(startDate)}
            {endDate &&
              localeDate(startDate) !== localeDate(endDate) &&
              ` sampai ${localeDate(endDate)}`}
            .
          </TypographyLead>

          <div tw="flex items-center gap-x-6 mt-8 pt-1 w-max border-t">
            {signatures?.map((signature) => (
              <div key={signature.name} tw="flex items-center gap-x-4">
                <div tw="flex flex-col">
                  <TypographyLarge className="text-sm">
                    {signature.name}
                  </TypographyLarge>
                  <TypographyLead className="text-xs">
                    {signature.position}
                  </TypographyLead>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
