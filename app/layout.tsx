import { Providers } from '@/shared/providers';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${nunito.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
