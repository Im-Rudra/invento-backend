/*
  Warnings:

  - You are about to drop the `MaterialTypesOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Material_TypeToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaterialTypesOrder" DROP CONSTRAINT "MaterialTypesOrder_material_type_id_fkey";

-- DropForeignKey
ALTER TABLE "MaterialTypesOrder" DROP CONSTRAINT "MaterialTypesOrder_order_id_fkey";

-- DropForeignKey
ALTER TABLE "_Material_TypeToOrder" DROP CONSTRAINT "_Material_TypeToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_Material_TypeToOrder" DROP CONSTRAINT "_Material_TypeToOrder_B_fkey";

-- DropTable
DROP TABLE "MaterialTypesOrder";

-- DropTable
DROP TABLE "_Material_TypeToOrder";

-- CreateTable
CREATE TABLE "_OrderToMaterialType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToMaterialType_AB_unique" ON "_OrderToMaterialType"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToMaterialType_B_index" ON "_OrderToMaterialType"("B");

-- AddForeignKey
ALTER TABLE "_OrderToMaterialType" ADD CONSTRAINT "_OrderToMaterialType_A_fkey" FOREIGN KEY ("A") REFERENCES "Material_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToMaterialType" ADD CONSTRAINT "_OrderToMaterialType_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
