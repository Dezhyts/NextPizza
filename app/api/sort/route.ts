import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// Варианты сортировки продуктов
export type SortOption = 'title' | 'price' | 'newest';
type SortOrder = 'asc' | 'desc';

export async function GET(req: NextRequest) {
  const sortByParam = req.nextUrl.searchParams.get('sortBy') as SortOption;

  // Выбираем порядок сортировки для продуктов
  const productOrderBy =
    sortByParam === 'price'
      ? { price: 'asc' as SortOrder }
      : sortByParam === 'newest'
        ? { createdAt: 'desc' as SortOrder }
        : { name: 'asc' as SortOrder };

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }, // сортировка категорий
    include: {
      products: {
        orderBy: productOrderBy, // сортировка продуктов внутри категории
      },
    },
  });

  return NextResponse.json(categories);
}
