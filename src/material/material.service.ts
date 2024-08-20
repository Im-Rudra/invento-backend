import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { Prisma } from '@prisma/client';
import { UpdateMaterialDto } from './dtos/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(where: Prisma.MaterialWhereUniqueInput) {
    const material = await this.prisma.material.findUnique({ where });
    return material;
  }

  async findAll() {
    const materials = await this.prisma.material.findMany({
      include: {
        Material_Type: true,
        Suppliers: {
          include: {
            Supplier: true,
          },
        },
      },
    });
    return materials;
  }

  async create(data: CreateMaterialDto) {
    const newMaterial = await this.prisma.material.create({ data });
    return newMaterial;
  }

  async delete(where: Prisma.MaterialWhereUniqueInput) {
    const deleteResponse = await this.prisma.material.deleteMany({ where });
    return deleteResponse;
  }

  async update(id: number, data: UpdateMaterialDto) {
    const updatedMaterial = await this.prisma.material.updateMany({
      where: { id },
      data,
    });
    return updatedMaterial;
  }
}
