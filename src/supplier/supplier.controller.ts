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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { Prisma } from '@prisma/client';
import { UpdateMaterialDto } from '@/material/dtos/update-material.dto';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getAllSuppliers() {
    try {
      const suppliers = await this.supplierService.findAll();
      return suppliers;
    } catch (error) {
      console.error('/supplier | get: ', error.message);
      throw error;
    }
  }

  @Post()
  async createSupplier(@Body() body: CreateSupplierDto) {
    try {
      const newSupplier = await this.supplierService.create(body);
      return newSupplier;
    } catch (error) {
      console.error('/supplier | post: ', error.message);
      throw error;
    }
  }

  @Put('/:id')
  async updateSupplier(
    @Body() body: UpdateSupplierDto,
    @Param('id') targetId: string,
  ) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Invalid id!');
      }

      const existingSupplier = await this.supplierService.findUnique({ id });
      if (!existingSupplier?.id) {
        throw new NotFoundException('No supplier found to update!');
      }

      if (!id) {
        throw new BadRequestException('Provide valid supplier id!');
      }

      const updatedSupplier = await this.supplierService.update(id, body);
      return updatedSupplier;
    } catch (error) {
      console.error('/supplier/:id | put: ', error.message);
      throw error;
    }
  }

  @Delete('/:id')
  async deleteSupplier(@Param('id') targetId: string) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Invalid deletion id!');
      }

      const deletetionResponse = await this.supplierService.delete(id);
      return deletetionResponse;
    } catch (error) {
      console.error('/supplier/:id | delete: ', error.message);
      throw error;
    }
  }
}
