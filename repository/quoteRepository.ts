import { Prisma, QuoteItem } from '@/prisma/generated/client';
import prisma from '@/prisma/prismaClient';

export interface BatchPayload {
  count: number
}

export type QuoteWithItems = Prisma.QuoteGetPayload<{
  include: {
    quoteItems: {
      include: {
        product: true
      }
    }
  };
}>;

export type QuoteItemWithProduct = Prisma.QuoteItemGetPayload<{
  include: {
    product: true
  };
}>;

/**
 * Get an existing quote for a user
 */
export async function getQuote(
  userId: string
): Promise<QuoteWithItems> {
  let quote = await prisma.quote.findFirst({
    where: {
      userId,
      isActive: true,
    },
    include: {
      quoteItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!quote) {
    quote = await createQuote(userId);
  }

  return quote;
}

/**
 * Create a new quote for a user
 */
async function createQuote(
  userId: string
): Promise<QuoteWithItems> {
  const newQuote = await prisma.quote.create({
    data: {
      userId,
    },
    include: {
      quoteItems: {
        include: {
          product: true
        }
      }
    }
  });

  return newQuote as QuoteWithItems;
}

/**
 * Get a quote by ID
 */
export async function getQuoteById(
  quoteId: number
): Promise<QuoteWithItems | null> {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: {
      quoteItems: {
        include: {
          product: true
        }
      }
    }
  });

  return quote as QuoteWithItems | null;
}

/**
 * Add or update an item in the quote
 */
export async function addItemToQuote(
  quoteId: number,
  productId: number,
  quantity: number,
  price: number
): Promise<QuoteItem | null> {
  const existingItem = await prisma.quoteItem.findFirst({
    where: {
      quoteId,
      productId,
    }
  });

  if (existingItem) {
    return await prisma.quoteItem.update({
      where: { id: existingItem.id },
      data: { 
        quantity: existingItem.quantity + quantity,
        price,
      }
    });
  } else {
    return await prisma.quoteItem.create({
      data: {
        quoteId,
        productId,
        quantity,
        price,
      }
    });
  }
}

/**
 * Update the quantity of a quote item
 */
export async function updateQuoteItemQuantity(
  quoteItemId: number,
  quantity: number
): Promise<QuoteItem | null> {
  if (quantity <= 0) {
    return await prisma.quoteItem.delete({
      where: { id: quoteItemId }
    });
  }

  return await prisma.quoteItem.update({
    where: { id: quoteItemId },
    data: { quantity }
  });
}

/**
 * Remove an item from the quote
 */
export async function removeQuoteItem(
  quoteItemId: number
): Promise<QuoteItem | null> {
  return await prisma.quoteItem.delete({
    where: { id: quoteItemId }
  });
}

/**
 * Deactivate user cart (mark quotes as inactive)
 */
export async function deactivateUserCart(cartId: number) {
  await prisma.quote.update({
    where: { 
      id: cartId,
      isActive: true 
    },
    data: { isActive: false }
  });
}

/**
 * Get the number of quote items for a user
 */
export async function getQuoteItemCount(userId: string): Promise<number> {
  let quote = await prisma.quote.findFirst({
    where: {
      userId,
      isActive: true,
    },
    include: {
      quoteItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!quote) {
    return 0;
  }

  return quote.quoteItems.reduce((total, item) => total + item.quantity, 0);
}
