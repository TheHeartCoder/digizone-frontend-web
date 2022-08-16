import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class skuDto {
  @IsString()
  @IsNotEmpty()
  skuName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  validity: number;

  @IsBoolean()
  @IsNotEmpty()
  lifetime: boolean;
}

export class skuDtoArrDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => skuDto)
  skuDetails: skuDto[];
}
