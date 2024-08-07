import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { UpdateMaterialDto } from './dtos/update-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getAllMaterial() {
    try {
      const materials = await this.materialService.findAll();
      return materials;
    } catch (error) {
      console.error('/material | get: ', error.message);
      throw error;
    }
  }

  @Post()
  async createMaterial(@Body() body: CreateMaterialDto) {
    try {
      // quering for existing material against the attempted material_name
      const existingMaterial = await this.materialService.findUnique({
        material_name: body.material_name,
      });

      // throwing conflict exception if type duplication happens
      // if (true) {
      if (existingMaterial?.id) {
        throw new ConflictException(
          'Duplicate material_name. Try different material_name',
          {
            description: 'material_name_duplication',
          },
        );
      }

      const newMaterial = await this.materialService.create(body);
      return newMaterial;
    } catch (error) {
      console.error('/material | post: ', error.message);
      throw error;
    }
  }

  @Delete(':id')
  async deleteMaterial(@Param('id') targetId: string) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Incorrect delete id');
      }
      const deleteResponse = await this.materialService.delete({ id });
      return deleteResponse;
    } catch (error) {
      console.error('/material/:id | delete: ', error.message);
      throw error;
    }
  }

  @Put(':id')
  async updateMaterial(
    @Body() body: UpdateMaterialDto,
    @Param('id') targetId: string,
  ) {
    try {
      const id = Number(targetId);
      if (!id) {
        throw new BadRequestException('Incorrect update id');
      }

      // quering for existing material against the attempted material_name
      const existingMaterial = await this.materialService.findUnique({
        NOT: { id },
        material_name: body.material_name,
      });

      if (existingMaterial?.id) {
        throw new ConflictException(
          'Duplicate material_name. Try different material_name',
          {
            description: 'material_name_duplication',
          },
        );
      }

      const material = await this.materialService.findUnique({ id });

      if (
        material?.material_name === body.material_name &&
        material?.price === body.price &&
        material?.material_type_id === body.material_type_id
      ) {
        throw new ConflictException('Change name/type/price, at least one!', {
          description: 'change_one_parameter_atleast',
        });
      }

      const updateResponse = await this.materialService.update(id, body);
      return updateResponse;
    } catch (error) {
      console.error('/material/:id | put: ', error.message);
      throw error;
    }
  }
}
