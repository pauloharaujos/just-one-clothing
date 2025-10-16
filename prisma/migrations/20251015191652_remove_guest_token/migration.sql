/*
  Warnings:

  - You are about to drop the column `guestToken` on the `Quote` table. All the data in the column will be lost.
  - Made the column `userId` on table `Quote` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Quote_guestToken_idx";

-- DropIndex
DROP INDEX "public"."Quote_guestToken_key";

-- AlterTable
ALTER TABLE "public"."Quote" DROP COLUMN "guestToken",
ALTER COLUMN "userId" SET NOT NULL;
