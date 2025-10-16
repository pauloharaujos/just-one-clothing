import prisma from '@/prisma/prismaClient';

export async function getProductByUrlKey(productUrlKey: string) {
  return prisma.product.findUnique({
    where: { url: productUrlKey },
    include: {
      productImageLinks: {
        include: { image: true }
      }
    }
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      productImageLinks: {
        include: { image: true }
      }
    }
  });
}

export async function getRecommendedProducts(limit: number = 4) {
  return prisma.product.findMany({
    where: { visible: true },
    take: limit,
    include: {
      productImageLinks: {
        include: { image: true }
      }
    },
    orderBy: { id: 'asc' }
  });
}
