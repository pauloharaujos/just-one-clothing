-- CreateEnum
CREATE TYPE "public"."UrlTargetType" AS ENUM ('PRODUCT', 'CATEGORY');

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "parentId" INTEGER,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UrlRewrite" (
    "id" SERIAL NOT NULL,
    "requestPath" TEXT NOT NULL,
    "targetType" "public"."UrlTargetType" NOT NULL,
    "targetId" INTEGER NOT NULL,
    "targetPath" TEXT,
    "redirectType" INTEGER,
    "isCanonical" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UrlRewrite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_url_key" ON "public"."Category"("url");

-- CreateIndex
CREATE UNIQUE INDEX "UrlRewrite_requestPath_key" ON "public"."UrlRewrite"("requestPath");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
