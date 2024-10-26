import {
  FlowerIcon,
  HeartHandshakeIcon,
  HouseIcon,
  ImagePlayIcon,
  InstagramIcon,
  TicketIcon,
  UsersIcon,
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
    icon: <HouseIcon size={24} />,
  },
  {
    href: "/for-you",
    label: "For You",
    icon: <FlowerIcon size={24} />,
  },
  {
    href: "/events",
    label: "Kegiatan",
    icon: <TicketIcon size={24} />,
  },
  {
    href: "/gallery",
    label: "Galeri",
    icon: <ImagePlayIcon size={24} />,
  },
  // {
  //   href: "/jobs",
  //   label: "Pekerjaan",
  //   icon: <BriefcaseIcon size={24} />,
  // },
  {
    href: "/ecosystem",
    label: "Ekosistem",
    icon: <HeartHandshakeIcon size={24} />,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: <UsersIcon size={24} />,
  },
  // {
  //   href: "/about",
  //   label: "Tentang",
  //   icon: <CircleHelpIcon size={24} />,
  // },
  // {
  //   href: "/contact",
  //   label: "Kontak",
  //   icon: <PhoneIcon size={24} />,
  // },
];

export const SOCIAL_LINKS = {
  instagram: {
    title: "Instagram",
    url: "https://instagram.com/palembang_digital",
    icon: <InstagramIcon size={24} />,
  },
};

export const SCROLL_AREA_ID = "scroll-area";
export const MOBILE_SCROLL_THRESHOLD = 24;
