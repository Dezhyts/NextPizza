import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/shared';

export const metadata: Metadata = {
  title: 'Next Pizza| Главная ',
};

export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
