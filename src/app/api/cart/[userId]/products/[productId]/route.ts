import { NextRequest, NextResponse } from 'next/server';
import { removeProductFromCart } from '@/dbOperations/cart/getCartItems';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string; productId: string } }
) => {
  const { userId, productId } = params;

  if (!userId || !productId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    await removeProductFromCart(userId, productId);
    return NextResponse.json({ message: 'Product deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Delete error', error }, { status: 500 });
  }
};
