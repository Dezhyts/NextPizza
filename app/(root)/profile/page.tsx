import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getUserSession();
  //Это делается внутри ядра библиотеки📦 next-auth/core (внутренняя логика).

  if (!session) {
    return redirect('/not-auth');
  }
  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect('/not-auth');
  }
  return <ProfileForm data={user} />;
}
