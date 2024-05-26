'use client';
import { Instagram, Sun, Heart } from 'lucide-react';
import Link from 'next/link';

import AuthenticationButton from '@/packages/components/base/AuthenticationButton/AuthenticationButton';
import Image from '@/packages/components/base/Images/Image';
import { Button } from '@/packages/components/ui/button';
import { Input } from '@/packages/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/packages/components/ui/navigation-menu';

function Header() {
  const navLinks = [
    {
      id: 1,
      title: 'acara',
      path: './acara'
    },
    {
      id: 2,
      title: 'tentang',
      path: './tentang'
    },
    {
      id: 3,
      title: 'galeri',
      path: './galeri'
    }
  ];
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-20 py-4 ">
        <div className="flex items-center">
          <div className="mr-4 flex  items-center">
            <Image
              src="logo-black-bg.svg"
              size={32}
              alt="Palembang Digital Logo"
            />
          </div>

          {navLinks.map((link, idx) => {
            return (
              <Button key={idx} variant="ghost" asChild>
                <Link href={link.path}>{link.title}</Link>
              </Button>
            );
          })}
          <NavigationMenu>
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
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center space-x-2 gap-2">
          <Input type="text" placeholder="Pencarian..." />
          <button className="btn bg-pink-500 text-white hover:bg-pink-400">
            <Heart />
            <span>Dukung kami</span>
          </button>
          <div className="flex gap-2">
            <div className="btn btn-circle border border-slate-400">
              <Sun />
            </div>
            <div className="btn  btn-circle border border-slate-400">
              <Instagram />
            </div>
          </div>

          <div className="flex gap-2">
            <AuthenticationButton />
            <Button>Daftar</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
