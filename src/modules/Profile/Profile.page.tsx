import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import Button from '@/packages/components/base/Buttons/Button';
import Image from '@/packages/components/base/Images/Image';
import { getServerAuthSession } from '@/packages/server/auth';

const Profile = async() => {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect('/');
  }

  const { image, name, email } = session.user;

  return (
    <div className="flex gap-4 items-center justify-center">
      {image && name && <Image src={image} alt={name} />}
      <div>
        <p>{name}</p>
        <p className="text-white/50">{email}</p>
        <Link href="/" className="inline-block mt-2">
          <Button>Back to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
