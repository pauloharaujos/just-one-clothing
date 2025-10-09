import { QuoteItem } from '@/prisma/generated/client';
import prisma from '@/prisma/prismaClient';
import { randomBytes } from 'crypto';

export interface BatchPayload {
  count: number
}

export interface QuoteWithItems {
  id: number;
  userId: string | null;
  guestToken: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  quoteItems: Array<{
    id: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      sku: string;
      url: string;
      price: number;
      productImageLinks: Array<{
        image: {
          filename: string;
          altText: string | null;
        };
      }>;
    };
  }>;
}

/**
 * Get an existing quote for a user or guest
 */
export async function getQuote(
  userId?: string, 
  guestToken?: string
): Promise<QuoteWithItems | null> {
  try {
    if (userId) {
      const userQuote = await prisma.quote.findFirst({
        where: {
          userId,
          isActive: true,
        },
        include: {
          quoteItems: {
            include: {
              product: {
                include: {
                  productImageLinks: {
                    include: { image: true }
                  }
                }
              }
            }
          }
        }
      });

      if (userQuote) {
        return userQuote as QuoteWithItems;
      }
    }

    if (guestToken) {
      const guestQuote = await prisma.quote.findFirst({
        where: {
          guestToken,
          isActive: true,
        },
        include: {
          quoteItems: {
            include: {
              product: {
                include: {
                  productImageLinks: {
                    include: { image: true }
                  }
                }
              }
            }
          }
        }
      });

      if (guestQuote) {
        return guestQuote as QuoteWithItems;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting quote:', error);
    return null;
  }
}

/**
 * Create a new quote for a user or guest
 */
export async function createQuote(
  userId?: string,
  guestToken?: string
): Promise<QuoteWithItems> {
  try {
    const newQuote = await prisma.quote.create({
      data: {
        userId: userId || null,
        guestToken: guestToken || generateGuestToken(),
      },
      include: {
        quoteItems: {
          include: {
            product: {
              include: {
                productImageLinks: {
                  include: { image: true }
                }
              }
            }
          }
        }
      }
    });

    return newQuote as QuoteWithItems;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw new Error('Failed to create quote');
  }
}

/**
 * Get a quote by ID
 */
export async function getQuoteById(
  quoteId: number
): Promise<QuoteWithItems | null> {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      include: {
        quoteItems: {
          include: {
            product: {
              include: {
                productImageLinks: {
                  include: { image: true }
                }
              }
            }
          }
        }
      }
    });

    return quote as QuoteWithItems | null;
  } catch (error) {
    console.error('Error getting quote with items:', error);
    return null;
  }
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
  try {
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
  } catch (error) {
    console.error('Error adding item to quote:', error);
    throw new Error('Failed to add item to quote');
  }
}

/**
 * Update the quantity of a quote item
 */
export async function updateQuoteItemQuantity(
  quoteItemId: number,
  quantity: number
): Promise<QuoteItem | null> {
  try {
    if (quantity <= 0) {
      return await prisma.quoteItem.delete({
        where: { id: quoteItemId }
      });
    }

    return await prisma.quoteItem.update({
      where: { id: quoteItemId },
      data: { quantity }
    });
  } catch (error) {
    console.error('Error updating quote item quantity:', error);
    throw new Error('Failed to update quote item quantity');
  }
}

/**
 * Remove an item from the quote
 */
export async function removeQuoteItem(
  quoteItemId: number
): Promise<QuoteItem | null> {
  try {
    return await prisma.quoteItem.delete({
      where: { id: quoteItemId }
    });
  } catch (error) {
    console.error('Error removing quote item:', error);
    throw new Error('Failed to remove quote item');
  }
}

/**
 * Clear all items from a quote
 */
export async function clearQuote(
  quoteId: number
): Promise<BatchPayload | null> {
  try {
    return await prisma.quoteItem.deleteMany({
      where: { quoteId }
    });
  } catch (error) {
    console.error('Error clearing quote:', error);
    throw new Error('Failed to clear quote');
  }
}

/**
 * Merge a guest quote to a user when they log in
 */
export async function mergeGuestQuoteToUser(
  guestToken: string,
  userId: string
): Promise<QuoteWithItems | null> {
  try {
    const guestQuote = await prisma.quote.findFirst({
      where: {
        guestToken,
        isActive: true,
      },
      include: {
        quoteItems: true
      }
    });

    if (!guestQuote) {
      return null;
    }

    let userQuote = await getQuote(userId);
    if (!userQuote) {
      userQuote = await createQuote(userId);
    }

    for (const item of guestQuote.quoteItems) {
      await addItemToQuote(userQuote.id, item.productId, item.quantity, item.price);
    }

    await prisma.quote.update({
      where: { id: guestQuote.id },
      data: { isActive: false }
    });

    return userQuote;
  } catch (error) {
    console.error('Error merging guest quote to user:', error);
    throw new Error('Failed to merge guest quote to user');
  }
}

/**
 * Generate a unique guest token
 */
function generateGuestToken(): string {
  return randomBytes(32).toString('hex');
}
