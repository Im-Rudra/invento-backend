-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Shipping', 'Delivered', 'Completed', 'Canceled');

-- CreateTable
CREATE TABLE "Material_Type" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "material_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "material_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "addresses" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialsOnSuppliers" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaterialsOnSuppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "supplier_id" INTEGER,
    "material_type_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "total_cost" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToMaterial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_Type_type_name_key" ON "Material_Type"("type_name");

-- CreateIndex
CREATE UNIQUE INDEX "Material_material_name_key" ON "Material"("material_name");

-- CreateIndex
CREATE INDEX "Material_material_name_idx" ON "Material"("material_name");

-- CreateIndex
CREATE INDEX "Material_material_type_id_idx" ON "Material"("material_type_id");

-- CreateIndex
CREATE INDEX "MaterialsOnSuppliers_material_id_idx" ON "MaterialsOnSuppliers"("material_id");

-- CreateIndex
CREATE INDEX "MaterialsOnSuppliers_supplier_id_idx" ON "MaterialsOnSuppliers"("supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialsOnSuppliers_material_id_supplier_id_key" ON "MaterialsOnSuppliers"("material_id", "supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToMaterial_AB_unique" ON "_OrderToMaterial"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToMaterial_B_index" ON "_OrderToMaterial"("B");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_material_type_id_fkey" FOREIGN KEY ("material_type_id") REFERENCES "Material_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialsOnSuppliers" ADD CONSTRAINT "MaterialsOnSuppliers_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialsOnSuppliers" ADD CONSTRAINT "MaterialsOnSuppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_material_type_id_fkey" FOREIGN KEY ("material_type_id") REFERENCES "Material_Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToMaterial" ADD CONSTRAINT "_OrderToMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToMaterial" ADD CONSTRAINT "_OrderToMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
