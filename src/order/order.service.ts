import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const newOrder = await this.prisma.order.create({ data });
    return newOrder;
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        Materials: true,
        Supplier: true,
        Material_Type: true,
      },
    });
    return orders;
  }

  async findUnique(where: Prisma.OrderWhereUniqueInput) {
    const order = await this.prisma.order.findUnique({
      where,
      include: {
        Materials: true,
        Supplier: true,
        Material_Type: true,
      },
    });
    return order;
  }

  async update(
    where: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderUncheckedUpdateInput,
  ) {
    const updatedOrder = await this.prisma.order.update({ where, data });
    return updatedOrder;
  }

  async delete(where: Prisma.OrderWhereUniqueInput) {
    const deleteResponse = await this.prisma.order.deleteMany({ where });
    return deleteResponse;
  }
}
