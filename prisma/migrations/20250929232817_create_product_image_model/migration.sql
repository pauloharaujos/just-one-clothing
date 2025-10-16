-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "altText" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductImageLink" (
    "productId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "ProductImageLink_pkey" PRIMARY KEY ("productId","imageId")
);

-- CreateIndex
CREATE INDEX "ProductImageLink_productId_idx" ON "public"."ProductImageLink"("productId");

-- CreateIndex
CREATE INDEX "ProductImageLink_imageId_idx" ON "public"."ProductImageLink"("imageId");

-- AddForeignKey
ALTER TABLE "public"."ProductImageLink" ADD CONSTRAINT "ProductImageLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductImageLink" ADD CONSTRAINT "ProductImageLink_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
