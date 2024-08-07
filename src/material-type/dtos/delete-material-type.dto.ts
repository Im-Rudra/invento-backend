import { IsNumber } from 'class-validator';

export class DeleteMaterialTypeDto {
  @IsNumber()
  id: number;
}
