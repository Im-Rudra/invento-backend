/*
  Warnings:

  - You are about to drop the column `total_cost` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToMaterial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_material_type_id_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToMaterial" DROP CONSTRAINT "_OrderToMaterial_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToMaterial" DROP CONSTRAINT "_OrderToMaterial_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total_cost";

-- DropTable
DROP TABLE "_OrderToMaterial";

-- CreateTable
CREATE TABLE "MaterialTypesOrder" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "material_type_id" INTEGER NOT NULL,

    CONSTRAINT "MaterialTypesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderMaterials" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Material_TypeToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "MaterialTypesOrder_order_id_idx" ON "MaterialTypesOrder"("order_id");

-- CreateIndex
CREATE INDEX "MaterialTypesOrder_material_type_id_idx" ON "MaterialTypesOrder"("material_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialTypesOrder_order_id_material_type_id_key" ON "MaterialTypesOrder"("order_id", "material_type_id");

-- CreateIndex
CREATE INDEX "OrderMaterials_order_id_idx" ON "OrderMaterials"("order_id");

-- CreateIndex
CREATE INDEX "OrderMaterials_material_id_idx" ON "OrderMaterials"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderMaterials_order_id_material_id_key" ON "OrderMaterials"("order_id", "material_id");

-- CreateIndex
CREATE UNIQUE INDEX "_Material_TypeToOrder_AB_unique" ON "_Material_TypeToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_Material_TypeToOrder_B_index" ON "_Material_TypeToOrder"("B");

-- AddForeignKey
ALTER TABLE "MaterialTypesOrder" ADD CONSTRAINT "MaterialTypesOrder_material_type_id_fkey" FOREIGN KEY ("material_type_id") REFERENCES "Material_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialTypesOrder" ADD CONSTRAINT "MaterialTypesOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaterials" ADD CONSTRAINT "OrderMaterials_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderMaterials" ADD CONSTRAINT "OrderMaterials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Material_TypeToOrder" ADD CONSTRAINT "_Material_TypeToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Material_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Material_TypeToOrder" ADD CONSTRAINT "_Material_TypeToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
