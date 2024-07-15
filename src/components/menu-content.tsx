import { NavigationLink } from "@//components/navigation-link";
import { MENU_LINKS } from "@//lib/constants";
import Image from "next/image";
import Link from "next/link";

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
            <span className="text-sm font-semibold tracking-tight">
              Palembang Digital
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          {MENU_LINKS.map((link) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>
      </div>

      {/* <hr />

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex flex-col gap-1">
          {Object.values(SOCIAL_LINKS).map((social) => (
            <NavigationLink
              key={social.url}
              href={social.url}
              label={social.title}
              icon={social.icon}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
