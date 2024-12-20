import { localeDate } from "@/lib/utils";

export default function DefaultCertificate({
  certificateUUID,
  recipient,
  role,
  event,
  startDate,
  endDate,
  locationName,
  signatures,
  qrCodeDataURL,
}: {
  certificateUUID: string;
  recipient: string;
  role: string;
  event: string;
  startDate: Date;
  endDate?: Date;
  locationName?: string;
  signatures?: any[];
  qrCodeDataURL?: string;
}) {
  return (
    <div tw="flex bg-slate-100 w-full justify-center items-center min-h-screen">
      <div tw="absolute bottom-0 left-0 w-full h-1/4 bg-slate-200" />

      <div tw="flex px-20 w-full">
        <div tw="flex flex-col bg-white border p-10 shadow-md w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            tw="absolute top-0 right-0"
            src="https://www.palembangdigital.org/certificate-watermark.png"
            alt="Palembang Digital Watermark"
            width={240}
          />

          <div tw="flex items-center gap-x-8 mb-8 h-[32px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.palembangdigital.org/logo-black-bg.png"
              alt="Palembang Digital"
              width={32}
              height={32}
              tw="mr-3"
            />
            <p tw="text-lg tracking-wide">Palembang Digital</p>
          </div>

          <p tw="text-5xl mb-8 tracking-wide">Sertifikat Apresiasi</p>

          <p tw="text-sm mb-0 text-slate-800 tracking-wide">Diberikan kepada</p>

          <div tw="flex mt-0 mb-2">
            <div tw="flex flex-col items-center mt-0 mr-8 border-b-2 border-slate-100 px-2 py-0">
              <p tw="text-2xl mt-3 mb-0 tracking-wide">{recipient}</p>
            </div>
          </div>

          <p tw="text-sm mb-6 text-slate-800 tracking-wide">
            atas partisipasinya sebagai {role} pada kegiatan:
          </p>

          <div tw="flex mb-2">
            <div tw="flex shrink bg-black px-4 rounded-md align-middle">
              <p tw="text-xl text-white mt-2 mb-2">{event}</p>
            </div>
          </div>

          <p tw="text-sm mb-4 text-slate-800 tracking-wide">
            pada tanggal {localeDate(startDate)}
            {endDate &&
              localeDate(startDate) !== localeDate(endDate) &&
              ` sampai ${localeDate(endDate)}`}
            {locationName && ` di ${locationName}`}.
          </p>

          <div tw="flex items-center mt-12 pt-1">
            {signatures?.map((signature) => (
              <div
                key={signature.name}
                tw="flex flex-col items-center mr-8 border-t-2 border-slate-100"
              >
                <p tw="text-md mt-2 mb-0 tracking-wide">{signature.name}</p>
                <p tw="text-xs mt-0 text-slate-800 tracking-wide">
                  {signature.position}
                </p>
              </div>
            ))}
          </div>

          <div tw="flex flex-col items-center absolute bottom-0 right-4 gap-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeDataURL} alt="QR Code" tw="w-48 h-48 mb-0" />
            <div tw="flex mb-4 mt-0">
              <div tw="flex shrink bg-slate-100 px-2 rounded-md align-middle">
                <p tw="text-xs text-slate-600 mt-1 mb-1">{certificateUUID}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
