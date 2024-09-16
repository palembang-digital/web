import { TypographyLarge } from "@/components/ui/typography";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <div className="px-20 py-10 mt-20 bg-neutral-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center content">
        <div>
          <Image
            src="/logo-white-bg.png"
            alt="Palembang Digital"
            width={32}
            height={32}
            loading="lazy"
          />
          <TypographyLarge className="text-white mt-2">
            Palembang Digital
          </TypographyLarge>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="https://instagram.com/palembang_digital">
            <div className="flex gap-2 text-white text-xs items-center">
              <InstagramLogoIcon className="w-6 h-6" /> @palembang_digital
            </div>
          </Link>
          <Link href="https://twitter.com/PLMBGDigital">
            <div className="flex gap-2 text-white text-xs items-center">
              <TwitterLogoIcon className="w-6 h-6" /> @PLMBGDigital
            </div>
          </Link>
          <Link href="https://www.youtube.com/@PalembangDigital">
            <div className="flex gap-2 text-white text-xs items-center">
              <YoutubeIcon className="w-6 h-6" /> @PalembangDigital
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
