import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  baseType,
  categoryType,
  platformType,
  SkuDetails,
} from 'src/shared/schema/products';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(categoryType)
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(platformType)
  platformType: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(baseType)
  baseType: string;

  @IsString()
  @IsNotEmpty()
  productUrl: string;

  @IsString()
  @IsNotEmpty()
  downloadUrl: string;

  @IsArray()
  @IsOptional()
  requirmentSpecification: [Record<string, any>];

  @IsArray()
  @IsOptional()
  highlights: [string];

  @IsOptional()
  @IsArray()
  skuDetatails: [SkuDetails];
  @IsOptional()
  image?: string;
  @IsOptional()
  imageDetails?: any;
  @IsOptional()
  stripeProductId?: string;
}
