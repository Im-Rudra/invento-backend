import { IsNumber, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsNumber()
  material_type_id: number;

  @IsString()
  material_name: string;

  @IsNumber()
  price: number;
}
