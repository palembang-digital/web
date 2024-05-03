'use client';

import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/packages/components/ui/button';
import { TypographyH1, TypographyP } from '@/packages/components/ui/typography';

function Hero() {
  const { status } = useSession();

  return (
    <section className="w-full px-4 md:px-16 lg:px-24 py-12 md:py-24 lg:py-32">
      <div className="container flex flex-col items-center justify-center px-4 md:px-6">
        <TypographyH1 className="text-center text-neutral-900">
          Dari Wong Kito, Untuk Wong Kito!
        </TypographyH1>
        <TypographyP className="font-normal leading-8 text-center text-neutral-600 max-w-3xl">
          Terbentuk untuk menjawab pertanyaan &quot;dimana saja pelaku digital
          di Sumatera Selatan?&quot;, Palembang Digital berusaha menjadi tempat
          bagi siapapun yang ingin mengenal, belajar, dan berinteraksi dengan
          ekosistem digital Sumatera Selatan.
        </TypographyP>
        {status === 'loading' ? null : status === 'authenticated' ? null : (
          <Button className="mt-6" onClick={() => signIn('google')}>
            Bergabung Sekarang
          </Button>
        )}
      </div>
    </section>
  );
}

export default Hero;
