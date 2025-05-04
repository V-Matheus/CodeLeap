import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';
import ClienteProvider from '@/components/ClienteProvider';

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
    <ClienteProvider>
      <html lang="en">
        <body className={`${roboto.variable} antialiased flex justify-center`}>
          {children}
        </body>
      </html>
    </ClienteProvider>
  );
}
