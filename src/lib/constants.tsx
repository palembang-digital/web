import {
  CircleHelpIcon,
  HeartHandshakeIcon,
  HouseIcon,
  InstagramIcon,
  PhoneIcon,
  TicketIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";

interface MenuLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const MENU_LINKS: MenuLink[] = [
  {
    href: "/",
    label: "Beranda",
    icon: <HouseIcon size={16} />,
  },
  {
    href: "/events",
    label: "Kegiatan",
    icon: <TicketIcon size={16} />,
  },
  {
    href: "/videos",
    label: "Video",
    icon: <VideoIcon size={16} />,
  },
  {
    href: "/ecosystem",
    label: "Ekosistem",
    icon: <HeartHandshakeIcon size={16} />,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: <UsersIcon size={16} />,
  },
  {
    href: "/about",
    label: "Tentang",
    icon: <CircleHelpIcon size={16} />,
  },
  {
    href: "/contact",
    label: "Kontak",
    icon: <PhoneIcon size={16} />,
  },
];

export const SOCIAL_LINKS = {
  instagram: {
    title: "Instagram",
    url: "https://instagram.com/palembang_digital",
    icon: <InstagramIcon size={16} />,
  },
};

export const SCROLL_AREA_ID = "scroll-area";
export const MOBILE_SCROLL_THRESHOLD = 20;