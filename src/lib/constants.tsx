import {
  BriefcaseIcon,
  CalendarDaysIcon,
  FlowerIcon,
  HeartHandshakeIcon,
  HouseIcon,
  ImageIcon,
  InstagramIcon,
  NewspaperIcon,
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
    icon: <HouseIcon size={18} />,
  },
  {
    href: "/for-you",
    label: "For You",
    icon: <FlowerIcon size={18} />,
  },
  {
    href: "/events",
    label: "Kegiatan",
    icon: <CalendarDaysIcon size={18} />,
  },
  {
    href: "/jobs",
    label: "Pekerjaan",
    icon: <BriefcaseIcon size={18} />,
  },
  {
    href: "/articles",
    label: "Artikel",
    icon: <NewspaperIcon size={18} />,
  },
  {
    href: "/ecosystem",
    label: "Ekosistem",
    icon: <HeartHandshakeIcon size={18} />,
  },
  {
    href: "/gallery",
    label: "Galeri",
    icon: <ImageIcon size={18} />,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: <UsersIcon size={18} />,
  },
  // {
  //   href: "/about",
  //   label: "Tentang",
  //   icon: <CircleHelpIcon size={18} />,
  // },
  // {
  //   href: "/contact",
  //   label: "Kontak",
  //   icon: <PhoneIcon size={18} />,
  // },
];

export const SOCIAL_LINKS = {
  instagram: {
    title: "Instagram",
    url: "https://instagram.com/palembang_digital",
    icon: <InstagramIcon size={18} />,
  },
};

export const SCROLL_AREA_ID = "scroll-area";
export const MOBILE_SCROLL_THRESHOLD = 18;
