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
        "Palembang Digital adalah komunitas yang berfokus pada pengembangan ekosistem digital di Palembang. Kami menyelenggarakan berbagai kegiatan seperti workshop, seminar, dan networking untuk mendukung pertumbuhan startup dan teknologi di Palembang.",
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
      question:
        "Kapan Palembang Digital didirikan? Dan didirikan oleh siapa saja?",
      answer:
        "Palembang Digital didirkan pada tanggal 21 April 2020, bertepatan dengan Hari Kartini. Palembang Digital didirikan oleh sekelompok anak muda kelahiran Bumi Sriwijaya yang telah berpengalaman di dunia IT dan bekerja di berbagai perusahaan teknologi nasional maupun internasional. Beberapa pendiri utama Palembang Digital adalah Joneten Saputra, Sofian Hadiwijaya, Tommy Maulana, Arief Rahmansyah, Faisal Morensya, dan Roylisto Putra Pradana.",
    },
    {
      question: "Apa saja kegiatan yang diadakan oleh Palembang Digital?",
      answer:
        "Palembang Digital menyelenggarakan berbagai kegiatan seperti workshop teknologi, seminar bisnis, bootcamp startup, hackathon, konferensi teknologi, serta acara networking untuk mempertemukan para pelajar, profesional, pengusaha, dan pengembang teknologi.",
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
          <Link href="https://www.palembangdigital.org" className="underline">
            palembangdigital.org
          </Link>
          ). Kamu juga dapat mengikuti media sosial kami untuk mendapatkan
          informasi terbaru tentang kegiatan dan acara kami.
        </p>
      ),
    },
    {
      question:
        "Institusi saya ingin berkolaborasi dengan Palembang Digital, bagimana caranya?",
      answer: (
        <p>
          Untuk berkolaborasi dengan Palembang Digital, kamu dapat mengisi
          formulir kerjasama di situs resmi Palembang Digital (
          <Link href="https://www.palembangdigital.org" className="underline">
            palembangdigital.org
          </Link>
          ). Kami akan segera menghubungi kamu untuk membicarakan lebih lanjut
          tentang kerjasama yang bisa dilakukan.
        </p>
      ),
    },
    {
      question:
        "Saya ingin menjadi sponsor Palembang Digital, bagaimana caranya?",
      answer: (
        <p>
          Terima kasih atas minat kamu untuk menjadi sponsor Palembang Digital!
          Kamu dapat memberikan one-time donation dengan mengunjungi halaman
          Saweria kami di{" "}
          <Link
            href="https://saweria.co/palembangdigital"
            className="underline"
            target="_blank"
          >
            saweria.co/palembangdigital
          </Link>
          . Untuk sponsorship atau partnership lainnya, kamu bisa menghubungi
          kami di{" "}
          <a
            href="mailto:sponsorship@palembangdigital.org"
            className="underline"
          >
            sponsorship@palembangdigital.org
          </a>
          .
        </p>
      ),
    },
  ];
  return (
    <div className="rounded-lg p-2 sm:p-6 mt-20">
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
