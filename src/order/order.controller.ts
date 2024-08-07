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
import { Prisma, Status } from '@prisma/client';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    try {
      const data: Prisma.OrderUncheckedCreateInput = {
        material_type_id: body.material_type_id,
        total_cost: body.total_cost,
        Materials: {
          connect: body.material_ids.map((id) => ({ id })),
        },
      };
      if (body.supplier_id) {
        data.supplier_id = body.supplier_id;
      }
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

      let updatedOrder = await this.orderService.update(
        { id },
        {
          Materials: {
            disconnect: order.Materials.map((m) => ({ id: m.id })),
          },
        },
      );

      const data: Prisma.OrderUncheckedUpdateInput = {
        material_type_id: body.material_type_id,
        status: body.status as Status,
        total_cost: body.total_cost,
        Materials: {
          connect: body.material_ids.map((id) => ({ id })),
        },
      };

      if (body.supplier_id) {
        data.supplier_id = body.supplier_id;
      }

      updatedOrder = await this.orderService.update({ id }, data);
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
