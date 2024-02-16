'use client';

import { PropsWithChildren } from 'react';

import type { NextPageProps } from '@/@types/global';
import Message from '@/modules/About/components/Message';
import Image from '@/packages/components/base/Images/Image';
import Link from '@/packages/components/base/Navigations/Link';

import styles from './AboutWrapper.client.module.css';

interface Props {
  searchParams: NextPageProps['searchParams'];
}

function AboutWrapper(props: PropsWithChildren<Props>) {
  const { children, searchParams } = props;

  return (
    <div className="flex justify-center items-center w-full mb-10">
      <main className="mt-10">
        <h1 className="text-center text-xl mb-10">
          About Palembang Digital
        </h1>

        <div className={styles.avatar}>
          <Image
            effect="blur"
            src="https://res.cloudinary.com/patal/image/upload/c_scale,w_600/v1622083241/patal/events/Artboard_1_300x_1_gz2rjw.png"
            size={200}
            alt="Sutan Gading Fadhillah Nasution"
            wrapperClassName="rounded-full overflow-hidden cursor-grab active:cursor-grabbing"
          />
        </div>

        <div className="flex items-center justify-center my-8 flex-col">
          <p>
            Passed Query:
          </p>
          <p>
            {JSON.stringify(searchParams)}
          </p>
          <Message messages={searchParams.text?.toString()} />
          <Link href="/" className="text-fuchsia-400 text-center mt-5">
            Back to Homepage
          </Link>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AboutWrapper;
