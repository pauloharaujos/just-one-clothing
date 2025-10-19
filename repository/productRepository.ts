import prisma from '@/prisma/prismaClient';

export async function getProductByUrlKey(productUrlKey: string) {
  return prisma.product.findUnique({
    where: { url: productUrlKey }
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id }
  });
}

export async function getRecommendedProducts(limit: number = 4) {
  return prisma.product.findMany({
    where: { visible: true },
    take: limit,
    orderBy: { id: 'asc' }
  });
}
