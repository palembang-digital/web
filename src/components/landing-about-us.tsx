import { TypographyH2 } from "@/components/ui/typography";

// TODO: #79 Implement LandingAboutUs component
export default function LandingAboutUs() {
  return (
    <div className="rounded-lg p-6 mt-20">
      <p className="italic text-neutral-400">About us</p>
      <TypographyH2 className="text-neutral-800">Tentang kami</TypographyH2>

      <p>
        Palembang Digital (Patal) adalah platform komunitas digital pertama dari
        dan untuk seluruh masyarakat Sumatera Selatan 🇮🇩.
      </p>
    </div>
  );
}
