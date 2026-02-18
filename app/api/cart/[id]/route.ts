import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

interface PatchParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: PatchParams) {
  try {
    const { id } = await params;
    const itemId = Number(id);

    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: PatchParams) {
  try {
    const { id } = await params;
    const itemId = Number(id);

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    await prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: ' Не удалось удалить корзину' },
      { status: 500 },
    );
  }
}
