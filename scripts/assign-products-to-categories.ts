import prisma from '@/prisma/prismaClient';

async function assignAllProductsToAllCategories() {
  console.log('🔗 Assigning all products to all categories...');

  try {
    const products = await prisma.product.findMany({
      where: { visible: true },
    });

    const categories = await prisma.category.findMany({
      where: { visible: true },
    });

    console.log(`Found ${products.length} products and ${categories.length} categories`);

    if (products.length === 0) {
      console.log('❌ No products found. Please add some products first.');
      return;
    }

    if (categories.length === 0) {
      console.log('❌ No categories found. Please add some categories first.');
      return;
    }

    let assignedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      for (const category of categories) {
        try {
          await prisma.productCategory.upsert({
            where: {
              productId_categoryId: {
                productId: product.id,
                categoryId: category.id,
              },
            },
            update: {
              updatedAt: new Date(),
            },
            create: {
              productId: product.id,
              categoryId: category.id,
            },
          });
          assignedCount++;
        } catch (error) {
          console.error('❌ Error assigning product to category:', error);
          skippedCount++;
        }
      }
    }

    console.log(`✅ Successfully assigned ${assignedCount} product-category relationships`);
    if (skippedCount > 0) {
      console.log(`⚠️  Skipped ${skippedCount} relationships (already existed or error occurred)`);
    }

    // Show summary
    console.log('\n📊 Summary:');
    console.log(`- Products: ${products.length}`);
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Total possible relationships: ${products.length * categories.length}`);
    console.log(`- Successfully assigned: ${assignedCount}`);
    console.log(`- Skipped: ${skippedCount}`);

  } catch (error) {
    console.error('❌ Error assigning products to categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
assignAllProductsToAllCategories();
