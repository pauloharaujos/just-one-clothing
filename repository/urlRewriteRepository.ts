import prisma from '@/prisma/prismaClient';
import { UrlTargetType } from '@/prisma/generated/client';

export interface UrlRewrite {
  id: number;
  requestPath: string;
  targetType: UrlTargetType;
  targetId: number;
  targetPath: string | null;
  redirectType: number | null;
  isCanonical: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Resolve a request path to a URL rewrite record
 */
export async function resolvePath(requestPath: string): Promise<UrlRewrite | null> {
  return prisma.urlRewrite.findFirst({
    where: {
      requestPath,
      isActive: true,
    },
  });
}

/**
 * Get all canonical URL rewrites for sitemap generation
 */
export async function getAllCanonicalRewrites(): Promise<UrlRewrite[]> {
  return prisma.urlRewrite.findMany({
    where: {
      isCanonical: true,
      isActive: true,
    },
    orderBy: {
      requestPath: 'asc',
    },
  });
}

/**
 * Create a canonical URL rewrite
 */
export async function createCanonicalRewrite(
  requestPath: string,
  targetType: UrlTargetType,
  targetId: number,
  targetPath?: string
): Promise<UrlRewrite> {
  return prisma.urlRewrite.create({
    data: {
      requestPath,
      targetType,
      targetId,
      targetPath: targetPath || requestPath,
      isCanonical: true,
      isActive: true,
    },
  });
}

/**
 * Create a redirect rewrite (301/302)
 */
export async function createRedirectRewrite(
  requestPath: string,
  targetPath: string,
  redirectType: 301 | 302
): Promise<UrlRewrite> {
  return prisma.urlRewrite.create({
    data: {
      requestPath,
      targetType: 'PRODUCT', // This doesn't matter for redirects
      targetId: 0, // This doesn't matter for redirects
      targetPath,
      redirectType,
      isCanonical: false,
      isActive: true,
    },
  });
}

/**
 * Update a rewrite's target path (useful when canonical URL changes)
 */
export async function updateRewriteTargetPath(
  id: number,
  newTargetPath: string
): Promise<UrlRewrite> {
  return prisma.urlRewrite.update({
    where: { id },
    data: {
      targetPath: newTargetPath,
      updatedAt: new Date(),
    },
  });
}

/**
 * Deactivate a rewrite
 */
export async function deactivateRewrite(id: number): Promise<UrlRewrite> {
  return prisma.urlRewrite.update({
    where: { id },
    data: {
      isActive: false,
      updatedAt: new Date(),
    },
  });
}
