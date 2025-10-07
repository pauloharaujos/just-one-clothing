import prisma from '@/prisma/prismaClient';

async function seedUrlRewrites() {
  console.log('🌱 Seeding URL rewrites...');

  try {
    const products = await prisma.product.findMany({
      where: { visible: true },
    });

    console.log(`Found ${products.length} products to create rewrites for`);

    for (const product of products) {
      await prisma.urlRewrite.upsert({
        where: { requestPath: `/${product.url}` },
        update: {
          targetType: 'PRODUCT',
          targetId: product.id,
          targetPath: `/${product.url}`,
          isCanonical: true,
          isActive: true,
        },
        create: {
          requestPath: `/${product.url}`,
          targetType: 'PRODUCT',
          targetId: product.id,
          targetPath: `/${product.url}`,
          isCanonical: true,
          isActive: true,
        },
      });
    }

    const categories = [
      {
        name: 'Electronics',
        url: 'electronics',
        description: 'Latest electronics and gadgets at unbeatable prices',
      },
      {
        name: 'Clothing',
        url: 'clothing',
        description: 'Fashion and clothing for every occasion',
      },
      {
        name: 'Home & Garden',
        url: 'home-garden',
        description: 'Everything you need for your home and garden',
      },
      {
        name: 'Sports',
        url: 'sports',
        description: 'Sports equipment and athletic gear',
      },
    ];

    console.log(`Creating ${categories.length} sample categories...`);

    for (const categoryData of categories) {
      const category = await prisma.category.upsert({
        where: { url: categoryData.url },
        update: categoryData,
        create: categoryData,
      });

      // Create URL rewrite for category
      await prisma.urlRewrite.upsert({
        where: { requestPath: `/${category.url}` },
        update: {
          targetType: 'CATEGORY',
          targetId: category.id,
          targetPath: `/${category.url}`,
          isCanonical: true,
          isActive: true,
        },
        create: {
          requestPath: `/${category.url}`,
          targetType: 'CATEGORY',
          targetId: category.id,
          targetPath: `/${category.url}`,
          isCanonical: true,
          isActive: true,
        },
      });
    }

    const electronicsCategory = await prisma.category.findUnique({
      where: { url: 'electronics' },
    });

    if (electronicsCategory) {
      const subcategories = [
        {
          name: 'Smartphones',
          url: 'electronics/smartphones',
          description: 'Latest smartphones and accessories',
          parentId: electronicsCategory.id,
        },
        {
          name: 'Laptops',
          url: 'electronics/laptops',
          description: 'Laptops and computer accessories',
          parentId: electronicsCategory.id,
        },
      ];

      for (const subcategoryData of subcategories) {
        const subcategory = await prisma.category.upsert({
          where: { url: subcategoryData.url },
          update: subcategoryData,
          create: subcategoryData,
        });

        // Create URL rewrite for subcategory
        await prisma.urlRewrite.upsert({
          where: { requestPath: `/${subcategory.url}` },
          update: {
            targetType: 'CATEGORY',
            targetId: subcategory.id,
            targetPath: `/${subcategory.url}`,
            isCanonical: true,
            isActive: true,
          },
          create: {
            requestPath: `/${subcategory.url}`,
            targetType: 'CATEGORY',
            targetId: subcategory.id,
            targetPath: `/${subcategory.url}`,
            isCanonical: true,
            isActive: true,
          },
        });
      }
    }

    console.log('✅ URL rewrites seeded successfully!');
    console.log(`Created rewrites for ${products.length} products and ${categories.length} categories`);

  } catch (error) {
    console.error('❌ Error seeding URL rewrites:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedUrlRewrites()
    .then(() => {
      console.log('🎉 Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

export default seedUrlRewrites;
