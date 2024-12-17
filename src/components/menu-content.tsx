import { NavigationLink } from "@/components/navigation-link";
import { MENU_LINKS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "./auth-button";

export function MenuContent() {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <Image
            src="/logo-black-bg.png"
            alt="Palembang Digital"
            width={30}
            height={30}
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              Palembang Digital
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-1">
          {MENU_LINKS.map((link) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
