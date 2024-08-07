import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { Prisma } from '@prisma/client';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.SupplierWhereUniqueInput) {
    const supplier = await this.prisma.supplier.findUnique({ where });
    return supplier;
  }

  async findAll() {
    const suppliers = await this.prisma.supplier.findMany({
      include: {
        Materials: {
          select: {
            id: true,
            Material: true,
          },
        },
      },
    });
    return suppliers;
  }

  async create(supplierData: CreateSupplierDto) {
    const data: Prisma.SupplierUncheckedCreateInput = {
      supplier_name: supplierData.supplier_name,
      addresses: supplierData.addresses,
    };
    if (supplierData.material_ids?.length) {
      data.Materials = {
        create: supplierData.material_ids.map((id) => ({
          Material: { connect: { id } },
        })),
      };
    }
    const newSupplier = await this.prisma.supplier.create({ data });
    return newSupplier;
  }

  async update(targetId: number, updateData: UpdateSupplierDto) {
    const resonse = await this.prisma.$transaction(async (prisma) => {
      await prisma.materialsOnSuppliers.deleteMany({
        where: { supplier_id: targetId },
      });

      await prisma.materialsOnSuppliers.createMany({
        data: updateData.material_ids.map((material_id) => ({
          supplier_id: targetId,
          material_id,
        })),
      });

      const updatedSupplier = await prisma.supplier.update({
        where: { id: targetId },
        data: {
          supplier_name: updateData.supplier_name,
          addresses: updateData.addresses,
        },
      });

      return updatedSupplier;
    });

    return resonse;
  }

  async delete(targetId: number) {
    const deletetionResponse = await this.prisma.supplier.deleteMany({
      where: { id: targetId },
    });
    return deletetionResponse;
  }
}
