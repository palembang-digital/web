import {
  HeartHandshakeIcon,
  HouseIcon,
  InstagramIcon,
  TicketIcon,
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
    label: "Ecosystem",
    icon: <HeartHandshakeIcon size={16} />,
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
