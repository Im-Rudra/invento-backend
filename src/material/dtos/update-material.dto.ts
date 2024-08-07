import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  material_name: string;

  @IsOptional()
  @IsNumber()
  material_type_id: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
