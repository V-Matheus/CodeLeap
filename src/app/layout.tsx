import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeLeap Test',
  description: 'Hello CodeLeap',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased flex justify-center`}>{children}</body>
    </html>
  );
}
