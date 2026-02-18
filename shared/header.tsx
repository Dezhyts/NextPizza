'use client';
import { AuthModal, CartButton, ProfileButton, SearchInput } from '@/shared';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PizzaLogo from '../public/pizzaLogo.png';
import { Container } from './container';

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = function ({
  className,
  hasSearch = true,
  hasCart = true,
}: HeaderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openAuthMopdal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    const isPaid = searchParams.has('paid');
    const isVerified = searchParams.has('verified');

    if (!isPaid && !isVerified) return;

    const message = isPaid
      ? 'Заказ успешно оплачен! Информация отправлена на почту'
      : 'Почта успешно подтверждена';

    toast.success(message);
    router.replace('/');
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левый блок */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src={PizzaLogo} alt="Logo" height={40} width={40} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        {/* Правый блок */}
        <div className="flex items-center gap-1">
          <AuthModal
            open={openAuthMopdal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
