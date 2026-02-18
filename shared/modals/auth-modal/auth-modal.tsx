'use client';
import { Button, Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { LoginForm, RegisterForm } from '@/shared/modals/forms';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex ga-2">
          <Button
            type="button"
            variant="secondary"
            className="gap-2 h-12 flex-1 p-2"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFjqGPor45q1DECnoBj8zLIDCD_tlgBaPng&s"
            />
            GitHUB
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="gap-2 h-12 flex-1 p-2"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png"
            />
            Google
          </Button>
        </div>
        <Button
          type="button"
          onClick={onSwitchType}
          className="h-12"
          variant={'outline'}
        >
          {type === 'login' ? 'Регистрация' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
