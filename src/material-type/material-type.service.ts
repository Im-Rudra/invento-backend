import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaterialTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(materialTypeName: string) {
    const newMaterialType = await this.prisma.material_Type.create({
      data: {
        type_name: materialTypeName,
      },
    });
    return newMaterialType;
  }

  async findUnique(where: Prisma.Material_TypeWhereUniqueInput) {
    const materialType = await this.prisma.material_Type.findUnique({ where });
    return materialType;
  }

  async findAll() {
    const materialTypes = await this.prisma.material_Type.findMany({
      orderBy: {
        type_name: 'asc',
      },
    });
    return materialTypes;
  }

  async update(id: number, type_name: string) {
    const updatedMaterialType = await this.prisma.material_Type.update({
      where: { id },
      data: { type_name },
    });
    return updatedMaterialType;
  }

  async deleteOne(id: number) {
    const delRes = await this.prisma.material_Type.deleteMany({
      where: { id },
    });
    return delRes;
  }
}
