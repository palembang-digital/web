import { TypographyH2 } from "@/components/ui/typography";

export default function LandingAboutUs() {
  return (
    <div className="rounded-lg p-6 mt-20">
      <p className="italic text-neutral-400">About us</p>
      <TypographyH2 className="text-neutral-800">Tentang kami</TypographyH2>

      <p className="text-sm mt-3">
        Palembang Digital (Patal) adalah platform komunitas digital dari dan
        untuk masyarakat Sumatera Selatan 🇮🇩.
      </p>

      <p className="text-sm mt-3">
        Terbentuk untuk menjawab pertanyaan &quot;dimana saja pelaku digital di
        Sumatera Selatan?&quot;
      </p>

      <p className="text-sm mt-3">
        Palembang Digital berusaha menjadi tempat bagi siapapun yang ingin
        mengenal, belajar, dan berinteraksi dengan ekosistem digital Sumatera
        Selatan.
      </p>

      <p className="text-sm mt-3">
        Bersama Palembang Digital, kamu bisa belajar dan berbagi ilmu di bidang
        pemrograman, product development, internet marketing, content creation,
        startup, AI dan sebagainya.
      </p>

      <p className="text-sm mt-3">🇮🇩👨‍💻👩‍💻📱🎮🎥🦄🤖</p>
    </div>
  );
}
