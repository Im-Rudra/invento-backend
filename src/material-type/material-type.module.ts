import { Module } from '@nestjs/common';
import { MaterialTypeController } from './material-type.controller';
import { MaterialTypeService } from './material-type.service';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [MaterialTypeController],
  providers: [MaterialTypeService, PrismaService],
})
export class MaterialTypeModule {}
