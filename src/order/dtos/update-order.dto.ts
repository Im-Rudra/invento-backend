import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { MaterialIdQtys, OrderType } from './create-order.dto';

export class UpdateOrderDto {
  @IsEnum(OrderType)
  order_type: string;

  @IsInt()
  supplier_id: number;

  @IsString()
  address: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  material_type_ids: number[];

  @IsOptional()
  @IsArray()
  @Type(() => MaterialIdQtys)
  material_id_qtys: MaterialIdQtys[];
}
