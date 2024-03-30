'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';

import Button from '@/packages/components/base/Buttons/Button';

const AuthenticationButton = () => {
  const { status, data } = useSession();

  if (status === 'loading') return (<p>Loading...</p>);

  return status === 'authenticated' ? (
    <div>
      <p>{data.user.name}</p>
      <p className="text-white/50">{data.user.email}</p>
      <div className="flex gap-x-2 items-center mt-2">
        <Link href="/profile">
          <Button>Go to Profile</Button>
        </Link>
        <Button className="bg-red-400" onClick={() => signOut()}>Sign out</Button>
      </div>
    </div>
  ) : (
    <Button onClick={() => signIn('google')}>
        Sign in with google
    </Button>
  );
};

export default AuthenticationButton;
