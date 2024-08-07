import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  material_type_id: number;

  @IsNumber()
  total_cost: number;

  @IsOptional()
  @IsNumber()
  supplier_id: number;

  @IsArray()
  @IsInt({ each: true })
  material_ids: number[];

  @IsString()
  status: string;
}
