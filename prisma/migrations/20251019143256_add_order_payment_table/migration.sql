/*
  Warnings:

  - You are about to drop the column `stripePaymentIntent` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSessionId` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "stripePaymentIntent",
DROP COLUMN "stripeSessionId";

-- CreateTable
CREATE TABLE "public"."OrderPayment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "stripeSessionId" TEXT,
    "stripePaymentIntent" TEXT,
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "paymentMethod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderPayment_orderId_key" ON "public"."OrderPayment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderPayment_stripeSessionId_key" ON "public"."OrderPayment"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderPayment_stripePaymentIntent_key" ON "public"."OrderPayment"("stripePaymentIntent");

-- CreateIndex
CREATE INDEX "OrderPayment_orderId_idx" ON "public"."OrderPayment"("orderId");

-- CreateIndex
CREATE INDEX "OrderPayment_stripeSessionId_idx" ON "public"."OrderPayment"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "public"."OrderPayment" ADD CONSTRAINT "OrderPayment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
