import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class checkoutDto {
  @IsString()
  @IsNotEmpty()
  skuPriceId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  skuId: string;
}

export class checkoutDtoArrDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => checkoutDto)
  checkoutDetails: checkoutDto[];
}
