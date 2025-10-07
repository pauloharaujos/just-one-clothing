import { MetadataRoute } from 'next';
import { getAllCanonicalRewrites } from '@/repository/urlRewriteRepository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rewrites = await getAllCanonicalRewrites();
  const baseUrl = 'https://justonedollar.com';

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Add all canonical rewrites to sitemap
  for (const rewrite of rewrites) {
    sitemap.push({
      url: `${baseUrl}${rewrite.requestPath}`,
      lastModified: rewrite.updatedAt,
      changeFrequency: rewrite.targetType === 'PRODUCT' ? 'weekly' : 'monthly',
      priority: rewrite.targetType === 'PRODUCT' ? 0.8 : 0.6,
    });
  }

  return sitemap;
}
