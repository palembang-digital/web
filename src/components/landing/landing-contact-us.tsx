import { ContactForm } from "@/components/landing/contact-form";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import Link from "next/link";

export default function LandingContactUs() {
  return (
    <>
      <div className="rounded-lg p-6 mt-20 bg-neutral-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <div className="p-2">
            <TypographyH3 className="text-white">
              Mari berkolaborasi 👋
            </TypographyH3>
            <p className="text-sm text-neutral-300 mt-2">
              Punya ide acara atau kegiatan apapun untuk memajukan digitalisasi
              Kota Palembang?
            </p>
            <p className="text-sm text-neutral-300">Ayo kolaborasi sekarang!</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border rounded-lg p-6">
          <TypographyH3>Punya pertanyaan? 🙋🏻</TypographyH3>
          <p className="text-sm text-neutral-600 mt-2">
            Jika kamu bingung, jangan ragu untuk bertanya! Kami akan dengan
            senang hati menjawabnya.
          </p>
          <a href="mailto:hi@palembangdigital.org">
            <Button className="mt-4">Hubungi kami</Button>
          </a>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <TypographyH3>Punya feedback? 💌</TypographyH3>
          <p className="text-sm text-neutral-600 mt-2">
            Kirim feedback apapun untuk kami agar kami bisa terus berkembang
            menjadi lebih baik!
          </p>
          <a href="mailto:hi@palembangdigital.org">
            <Button className="mt-4">Kirim feedback</Button>
          </a>
        </div>
      </div>

      <div className="rounded-lg p-6 mt-4 border bg-white">
        <TypographyH3>Beri dukungan 🫶🏻</TypographyH3>
        <p className="text-sm text-neutral-600 mt-2">
          Apakah kamu mendapatkan manfaat dari Palembang Digital? Apakah kamu
          merasa beresonansi dengan visi & misi kami? Jika iya, kamu bisa
          memberikan dukunganmu agar kami bisa terus mengadakan
          kegiatan-kegiatan bertemakan digital dan tekonologi yang bermanfaat
          bagi kota Palembang.
        </p>
        <Link href="https://saweria.co/palembangdigital" target="_blank">
          <Button className="mt-4 bg-pink-500 hover:bg-pink-500/90">
            Dukung kami
          </Button>
        </Link>
      </div>
    </>
  );
}
