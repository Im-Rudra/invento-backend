/*
  Warnings:

  - Added the required column `order_type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('by_materials', 'by_suppliers');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "order_type" "OrderType" NOT NULL;
