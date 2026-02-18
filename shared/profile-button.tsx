import { Button } from '@/shared/components/ui';
import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ProfileButtonProps {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton = ({
  className,
  onClickSignIn,
}: ProfileButtonProps) => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';

  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={isLoading}
          variant="outline"
          onClick={onClickSignIn}
          className="flex items-center gap-[4px]"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="outline" className="flex items-center gap-[4px]">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
