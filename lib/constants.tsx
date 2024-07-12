import {
  CalendarIcon,
  HouseIcon,
  InstagramIcon,
  YoutubeIcon,
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
    icon: <CalendarIcon size={16} />,
  },
  {
    href: "/videos",
    label: "Video",
    icon: <YoutubeIcon size={16} />,
  },
];

export const SOCIAL_LINKS = {
  instagram: {
    title: "Instagram",
    url: "https://instagram.com/palembang_digital",
    icon: <InstagramIcon size={16} />,
  },
};
