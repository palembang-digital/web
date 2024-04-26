import '@/styles/bundle.css';

import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { SITE_NAME } from '@/configs/env';
import AuthProvider from '@/packages/components/base/AuthProvider/AuthProvider';
import { withMetadata } from '@/packages/utils/metadata';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  adjustFontFallback: false
});

/**
 * HTML Metadata in App Route
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields
 */
export const metadata = withMetadata({
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  }
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
