import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';

import '@/app/globals.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Harbor Smile Studio | Family Dental Clinic',
  description:
    'Distinctive family dental care with preventive, cosmetic, and restorative services. Explore our Decap CMS powered oral health journal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
