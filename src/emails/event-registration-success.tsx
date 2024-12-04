import { BASE_URL } from "@/lib/constants";
import { getDay, localeDate, localeTime } from "@/lib/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function EventRegistrationSuccess({
  event,
  user,
}: {
  event: any;
  user: any;
}) {
  return (
    <Html lang="id">
      <Head />
      <Preview>{`Pendaftaran berhasil untuk kegiatan ${event.name}`}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal p-0 mt-[10px] mb-[30px] mx-0">
                Konfirmasi Pendaftaran
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hai {user.name}, kamu telah terdaftar untuk kegiatan{" "}
                <strong>{event.name}</strong>.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                🗓️{" "}
                <strong>{`${getDay(event.scheduledStart)}, ${localeDate(event.scheduledStart)}`}</strong>
                <br />⏰ {localeTime(event.scheduledStart)}
                <br />
                📍 {event.locationName}
              </Text>

              <Section className="my-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={`${BASE_URL}/events/${event.id}`}
                >
                  Lihat halaman kegiatan
                </Button>
                {event.whatsappGroupUrl && (
                  <Button
                    className="bg-[#f1f5f9] rounded border-black text-black text-[12px] font-semibold no-underline text-center px-5 py-3 ml-2"
                    href={`${BASE_URL}/events/${event.id}/whatsapp-group`}
                  >
                    Gabung grup WhatsApp
                  </Button>
                )}
              </Section>

              <Hr className="border border-solid border-[#eaeaea] my-[32px] mx-0 w-full" />

              <Section>
                <Img
                  src={`${BASE_URL}/logo-black-bg.png`}
                  width="20"
                  height="20"
                  alt="Palembang Digital"
                  className="my-0"
                />
                <Link href={BASE_URL}>
                  <Text className="text-black text-[14px] leading-[0px]">
                    Palembang Digital
                  </Text>
                </Link>
                <Text className="text-[#666666] text-[12px] leading-[12px]">
                  Made with ❤️ in Palembang
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

EventRegistrationSuccess.PreviewProps = {
  event: {
    id: 130,
    name: "Sriwijaya Digital Conference 2024",
    scheduledStart: new Date("2024-12-14T01:00:00Z"),
    locationName: "Telkom Indonesia Witel Sumbagsel, Jl. Jend. Sudirman No.459",
    whatsappGroupUrl: "https://chat.whatsapp.com/invite/1234567890",
  },
  user: {
    name: "Arief Rahmansyah",
  },
};
