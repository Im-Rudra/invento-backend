import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderType, Prisma, Status } from '@prisma/client';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    try {
      const data: Prisma.OrderUncheckedCreateInput = {
        order_type: body.order_type as OrderType,
        supplier_id: body.supplier_id,
        address: body.address,
        Materials: {
          create: body.material_id_qtys.map((mq) => ({
            material_id: mq.material_id,
            quantity: mq.quantity,
          })),
        },
        Material_Types: {
          connect: body.material_type_ids.map((id) => ({ id })),
        },
      };

      const newOrder = await this.orderService.create(data);
      return newOrder;
    } catch (error) {
      console.log('/order | post: ', error.message);
      throw error;
    }
  }

  @Get()
  async getOrders() {
    try {
      const orders = this.orderService.findAll();
      return orders;
    } catch (error) {
      console.log('/order | get: ', error.message);
      throw error;
    }
  }

  @Put('/:id')
  async updateOrder(
    @Param('id') targetId: string,
    @Body() body: UpdateOrderDto,
  ) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Invalid id!');
      }

      const order = await this.orderService.findUnique({ id });

      if (!order?.id) {
        throw new NotFoundException('No order to update!');
      }

      const data: Prisma.OrderUncheckedUpdateInput = {
        order_type: body.order_type as OrderType,
        address: body.address,
        supplier_id: body.supplier_id,
      };

      if (body.material_id_qtys?.length > 0) {
        data.Materials = {
          delete: order.Materials.map((mq) => ({ id: mq.id })),
          create: body.material_id_qtys.map((mq) => ({
            material_id: mq.material_id,
            quantity: mq.quantity,
          })),
        };
      }

      if (body.material_type_ids?.length > 0) {
        data.Material_Types = {
          disconnect: order.Material_Types.map((t) => ({ id: t.id })),
          connect: body.material_type_ids.map((t) => ({ id: t })),
        };
      }

      const updatedOrder = await this.orderService.update({ id }, data);
      return updatedOrder;
    } catch (error) {
      console.log('/order/:id | put: ', error.message);
      throw error;
    }
  }

  @Delete('/:id')
  async deleteOrder(@Param('id') targetId: string) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Invalid id!');
      }
      const deleteResponse = await this.orderService.delete({ id });
      return deleteResponse;
    } catch (error) {
      console.log('/order/:id | delete: ', error.message);
      throw error;
    }
  }
}
