import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Получаем или создаём токен корзины
    let token = req.cookies.get('cartToken')?.value;
    if (!token) {
      token = crypto.randomUUID();
    }

    // Получаем или создаём корзину
    const userCart = await findOrCreateCart(token);

    // Данные из запроса
    const data = (await req.json()) as CreateCartItemValues;
    const ingredientIds = data.ingredients || [];

    const existingItems = await prisma.cartItem.findMany({
      where: { cartId: userCart.id, productItemId: data.productItemId },
      include: { ingredients: true },
    });

    const findCartItem = existingItems.find((item) => {
      const itemIds = item.ingredients.map((i) => i.id).sort((a, b) => a - b);
      const dataIds = [...ingredientIds].sort((a, b) => a - b);
      return (
        itemIds.length === dataIds.length &&
        itemIds.every((id, idx) => id === dataIds[idx])
      );
    });

    // Если товар найден — увеличиваем количество
    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      // Иначе создаём новый cartItem
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: ingredientIds.map((id) => ({ id })) },
        },
      });
    }

    // Обновляем сумму корзины
    const updatedUserCart = await updateCartTotalAmount(token);

    // Возвращаем ответ и ставим cookie
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 },
    );
  }
}
