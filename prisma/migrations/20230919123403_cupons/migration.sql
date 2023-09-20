/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Cupon` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expiresAt` to the `Cupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cupon_storeId_idx";

-- AlterTable
ALTER TABLE "Cupon" DROP COLUMN "updatedAt",
ADD COLUMN     "claimed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "claimedAt" TIMESTAMP(3),
ADD COLUMN     "claimedById" TEXT[],
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Customer";

-- CreateIndex
CREATE INDEX "Cupon_storeId_claimedById_idx" ON "Cupon"("storeId", "claimedById");
