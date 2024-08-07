import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSupplierDto {
  @IsString()
  supplier_name: string;

  @IsArray() // ensures its an array
  @ArrayNotEmpty()
  @IsString({ each: true }) // checks every item of array to be string
  addresses: string[];

  @IsOptional() // optional field
  @IsArray()
  @IsInt({ each: true })
  material_ids?: number[];
}
