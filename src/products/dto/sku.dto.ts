import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { durationType } from 'src/shared/schema/products';

export class skuDto {
  @IsString()
  @IsNotEmpty()
  skuName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  validityAmount: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(durationType)
  durationType: string;

  @IsBoolean()
  @IsNotEmpty()
  lifetime: boolean;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  licenceKeys: [string];
}

export class skuDtoArrDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => skuDto)
  skuDetails: skuDto[];
}
