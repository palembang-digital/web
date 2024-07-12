import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function Header() {
  const session = await auth();

  const navLinks = [
    {
      title: "Events",
      path: "/events",
    },
    {
      title: "Videos",
      path: "/videos",
    },
    // {
    //   id: 3,
    //   title: "Galeri",
    //   path: "/galeri",
    // },
  ];

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-20 py-4 ">
        <div className="flex items-center">
          <div className="mr-4 flex  items-center">
            <Link href="/">
              <Image
                src="logo-black-bg.svg"
                height={32}
                width={32}
                alt="Palembang Digital Logo"
              />
            </Link>
          </div>

          {navLinks.map((link, idx) => {
            return (
              <Button key={idx} variant="ghost" asChild>
                <Link href={link.path}>{link.title}</Link>
              </Button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center space-x-2 gap-2">
          {/* TODO: Update so that we can use shortcut
              Try to use this component: https://ui.shadcn.com/docs/components/command
           */}
          {/* <Input type="text" placeholder="Pencarian..." /> */}

          <Button className="bg-pink-500 text-white hover:bg-pink-400">
            <Heart className="mr-2 h-4 w-4" /> Dukung kami
          </Button>

          <div className="flex gap-2">{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
