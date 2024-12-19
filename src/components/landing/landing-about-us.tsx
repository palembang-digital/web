import { TypographyH2 } from "@/components/ui/typography";

export default function LandingAboutUs() {
  return (
    <div className="rounded-lg p-2 sm:p-6 mt-20">
      <p className="italic text-neutral-400">About us</p>
      <TypographyH2 className="text-neutral-800">Tentang kami</TypographyH2>

      <p className="text-sm mt-3">
        Palembang Digital (Patal) adalah platform komunitas digital yang
        terbentuk untuk menjawab pertanyaan{" "}
        <span className="bg-gradient-to-r from-gray-200 to-gray-50 bg-[length:100%_3px] bg-left-bottom bg-no-repeat">
          &quot;dimana saja pelaku digital di Sumatera Selatan?&quot;
        </span>
      </p>

      <p className="text-sm mt-3">
        Palembang Digital adalah tempat bagi siapapun yang ingin mengenal,
        belajar, dan berinteraksi dengan ekosistem digital Sumatera Selatan.
      </p>

      <p className="text-sm mt-3">
        Bersama Palembang Digital, kamu bisa belajar dan bertumbuh bersama di
        bidang pemrograman, product development, internet marketing, content
        creation, startup, AI dan sebagainya.
      </p>

      <p className="text-sm mt-3">🇮🇩👨‍💻👩‍💻📱🎮🎥🦄🤖</p>
    </div>
  );
}
