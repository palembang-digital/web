'use client';

import { LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/packages/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/packages/components/ui/dropdown-menu';

const AuthenticationButton = () => {
  const { status, data } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  return status === 'authenticated' ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{data.user.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={() => signIn('google')}>Masuk</Button>
  );
};

export default AuthenticationButton;
