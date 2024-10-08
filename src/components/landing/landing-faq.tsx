import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";

export default function LandingFAQ() {
  const items = [
    {
      question: "Apa itu Palembang Digital?",
      answer:
        "Palembang Digital adalah komunitas dan inisiatif yang berfokus pada pengembangan ekosistem digital di Palembang. Mereka menyelenggarakan berbagai kegiatan seperti workshop, seminar, dan networking untuk mendukung pertumbuhan startup dan teknologi di kota ini.",
    },
    {
      question: "Apa visi dan misi Palembang Digital?",
      answer: (
        <>
          <p className="font-bold">Visi</p>
          <p>
            Menciptakan sumber daya manusia Sumatera Selatan yang memiliki daya
            saing unggul di bidang digital.
          </p>
          <p className="font-bold mt-2">Misi</p>
          <ol className="list-decimal list-inside">
            <li>
              Mewujudkan talenta-talenta lokal Sumatera Selatan yang memiliki
              jiwa kolaboratif dan inovatif tinggi.
            </li>
            <li>
              Mewujudkan ekosistem digital yang terus beregenerasi untuk
              keberlangsungan talenta lokal Sumatera Selatan.
            </li>
            <li>
              Meningkatkan hard skills pelaku digital dan masyarakat Sumatera
              Selatan dalam bidang digital.
            </li>
          </ol>
        </>
      ),
    },
    {
      question: "Apa saja kegiatan yang diadakan oleh Palembang Digital?",
      answer:
        "Palembang Digital menyelenggarakan berbagai kegiatan seperti workshop teknologi, seminar bisnis, bootcamp startup, hackathon, dan acara networking untuk mempertemukan para profesional, pengusaha, dan pengembang teknologi.",
    },
    {
      question: "Apa manfaat bergabung dengan Palembang Digital?",
      answer:
        "Manfaat bergabung dengan Palembang Digital antara lain adalah mendapatkan akses ke berbagai pelatihan dan seminar, memperluas jaringan profesional, mendapatkan mentor yang berpengalaman, dan berkesempatan untuk berkolaborasi dalam berbagai proyek teknologi dan startup.",
    },
    {
      question: "Siapa saja yang bisa bergabung dengan Palembang Digital?",
      answer:
        "Palembang Digital terbuka untuk semua orang yang tertarik dengan dunia digital dan teknologi, mulai dari pelajar, mahasiswa, profesional, hingga pengusaha. Tidak ada batasan usia atau latar belakang pendidikan untuk bergabung.",
    },
    {
      question: "Bagaimana cara bergabung dengan komunitas Palembang Digital?",
      answer: (
        <p>
          Untuk bergabung, kamu dapat mendaftar melalui situs resmi Palembang
          Digital (
          <Link href="https://palembangdigital.org" className="underline">
            https://palembangdigital.org
          </Link>
          ). Kamu juga dapat mengikuti media sosial kami untuk mendapatkan
          informasi terbaru tentang kegiatan dan acara kami.
        </p>
      ),
    },
  ];
  return (
    <div className="rounded-lg p-6 mt-20">
      <p className="italic text-neutral-400">FAQ</p>
      <TypographyH2 className="text-neutral-800">
        Get to know us more!
      </TypographyH2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
