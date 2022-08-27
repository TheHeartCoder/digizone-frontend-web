import { IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import {
  baseType,
  categoryType,
  platformType,
} from 'src/shared/schema/products';

export class GetProductQueryDto {
  @ValidateIf((object: any, value: any) => value !== undefined)
  @IsString()
  search: string;

  @ValidateIf((object: any, value: any) => value !== undefined)
  @IsString()
  @IsIn([categoryType.applicationSoftware, categoryType.operatingSystem])
  category: categoryType;

  @ValidateIf((object: any, value: any) => value !== undefined)
  @IsString()
  @IsIn([
    platformType.android,
    platformType.ios,
    platformType.windows,
    platformType.linux,
    platformType.mac,
  ])
  platformType: platformType;

  @ValidateIf((object: any, value: any) => value !== undefined)
  @IsString()
  @IsIn([baseType.computer, baseType.mobile])
  baseType: baseType;

  @IsOptional()
  dashboard?: string;
}
