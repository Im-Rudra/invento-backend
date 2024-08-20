import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class MaterialIdQtys {
  @IsInt()
  material_id: number;

  @IsInt()
  quantity: number;
}

export enum OrderType {
  by_materials = 'by_materials',
  by_suppliers = 'by_suppliers',
}

export class CreateOrderDto {
  @IsEnum(OrderType)
  order_type: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  material_type_ids: number[];

  @IsInt()
  supplier_id: number;

  @IsArray()
  @Type(() => MaterialIdQtys)
  material_id_qtys: MaterialIdQtys[];

  @IsString()
  address: string;
}
