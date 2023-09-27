/*
  Warnings:

  - You are about to drop the column `claimed` on the `UserToCupon` table. All the data in the column will be lost.
  - You are about to drop the column `claimedAt` on the `UserToCupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserToCupon" DROP COLUMN "claimed",
DROP COLUMN "claimedAt",
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "usedAt" TIMESTAMP(3),
ADD COLUMN     "usedAtProduct" TEXT;
