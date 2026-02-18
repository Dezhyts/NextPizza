import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductModalPage(props: ProductPageProps) {
  const { id } = await props.params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <ChooseProductModal product={product} />
  );
}
