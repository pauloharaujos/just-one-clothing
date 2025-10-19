-- DropForeignKey
ALTER TABLE "public"."ProductImageLink" DROP CONSTRAINT "ProductImageLink_imageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductImageLink" DROP CONSTRAINT "ProductImageLink_productId_fkey";

-- DropIndex
DROP INDEX "public"."ProductImageLink_imageId_idx";

-- DropIndex
DROP INDEX "public"."ProductImageLink_productId_idx";

-- DropTable
DROP TABLE "public"."ProductImageLink";

-- DropTable
DROP TABLE "public"."Image";

