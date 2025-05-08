/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderItem" DROP CONSTRAINT "_OrderItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderItem" DROP CONSTRAINT "_OrderItem_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity";

-- DropTable
DROP TABLE "_OrderItem";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
