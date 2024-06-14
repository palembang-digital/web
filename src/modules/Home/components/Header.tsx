'use client';
import { Heart, Instagram, Sun } from 'lucide-react';
import Link from 'next/link';

import AuthenticationButton from '@/packages/components/base/AuthenticationButton/AuthenticationButton';
import Image from '@/packages/components/base/Images/Image';
import { Button } from '@/packages/components/ui/button';
import { Input } from '@/packages/components/ui/input';

function Header() {
  const navLinks = [
    {
      id: 1,
      title: 'Acara',
      path: '/events'
    },
    {
      id: 2,
      title: 'Tentang',
      path: '/tentang'
    },
    {
      id: 3,
      title: 'Galeri',
      path: '/galeri'
    }
  ];

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-20 py-4 ">
        <div className="flex items-center">
          <div className="mr-4 flex  items-center">
            <Link href="/">
              <Image
                src="logo-black-bg.svg"
                size={32}
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

          {/* TODO */}
          {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ekosistem</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <div className="w-40">
                      <p>Comming soon</p>
                      <p>Comming soon</p>
                      <p>Comming soon</p>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>

        <div className="ml-auto flex items-center space-x-2 gap-2">
          {/* TODO: Update so that we can use shortcut
              Try to use this component: https://ui.shadcn.com/docs/components/command
           */}
          <Input type="text" placeholder="Pencarian..." />

          <Button className="bg-pink-500 text-white hover:bg-pink-400">
            <Heart className="mr-2 h-4 w-4" /> Dukung kami
          </Button>

          <div className="flex gap-2">
            {/* TODO: */}
            <Button variant="outline" size="icon" className="rounded-full">
              <Sun className="h-4 w-4" />
            </Button>

            <a href="https://instagram.com/palembang_digital">
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="flex gap-2">
            <AuthenticationButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
