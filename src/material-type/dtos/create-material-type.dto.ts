import { IsString } from 'class-validator';

export class CreateMaterialTypeDto {
  @IsString()
  type_name: string;
}
