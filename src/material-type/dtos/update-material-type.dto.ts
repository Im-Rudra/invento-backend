import { IsNumber, IsString } from 'class-validator';

export class UpdateMaterialTypeDto {
  @IsNumber()
  id: number;

  @IsString()
  type_name: string;
}
