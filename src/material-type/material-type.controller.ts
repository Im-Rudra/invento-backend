import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMaterialTypeDto } from './dtos/create-material-type.dto';
import { MaterialTypeService } from './material-type.service';
import { UpdateMaterialTypeDto } from './dtos/update-material-type.dto';

@Controller('material-type')
export class MaterialTypeController {
  constructor(private readonly materialTypeService: MaterialTypeService) {}

  @Get()
  async getMaterialTypes() {
    try {
      // throw new Error('dfd');
      const materialTypes = await this.materialTypeService.findAll();
      return materialTypes;
    } catch (error) {
      console.log('/material-type | get: ', error.message);
      throw error;
    }
  }

  @Post()
  async createMaterialType(@Body() body: CreateMaterialTypeDto) {
    try {
      // quering for existing material_type against the attempted type_name
      const existingType = await this.materialTypeService.findUnique({
        type_name: body.type_name,
      });

      // throwing conflict exception if type duplication happens
      if (existingType?.id) {
        throw new ConflictException(
          'Duplicate type_name. Try different type_name',
          {
            description: 'material_type_duplication',
          },
        );
      }

      // creating new type
      const newType = await this.materialTypeService.create(body.type_name);
      return newType;
    } catch (error) {
      console.log('/material-type | post: ', error.message);
      throw error;
    }
  }

  @Put()
  async updateMaterialType(@Body() body: UpdateMaterialTypeDto) {
    try {
      // quering for existing material_type for the attempted type_name
      const existingType = await this.materialTypeService.findUnique({
        type_name: body.type_name,
      });
      console.log(existingType);

      // throwing conflict exception if type duplication happens
      if (existingType?.id) {
        throw new ConflictException('Update failed. Try different type_name', {
          description: 'material_type_duplication',
        });
      }

      // creating new type
      const updatedType = await this.materialTypeService.update(
        body.id,
        body.type_name,
      );
      return updatedType;
    } catch (error) {
      console.log('/material-type | put: ', error.message);
      throw error;
    }
  }

  @Delete()
  async deleteMaterialType(@Query('id') id: string) {
    if (!id) return { error: true, message: 'No material type id provided' };
    try {
      const deleteResponse = await this.materialTypeService.deleteOne(
        Number(id),
      );
      return deleteResponse;
    } catch (error) {
      console.log('/material-type | delete: ', error.message);
      throw error;
    }
  }
}
