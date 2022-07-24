import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
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
  @IsObject()
  description: any;

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

  @IsObject()
  @IsOptional()
  requirmentSpecification: Record<string, any>;

  @IsObject()
  @IsOptional()
  highlights: Record<string, any>;

  @IsOptional()
  @IsArray()
  skuDetatails: [SkuDetails];

  image?: string;

  imageDetails?: any;
}
