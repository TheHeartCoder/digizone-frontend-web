import { IsIn, IsString, ValidateIf } from 'class-validator';
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
}

// Query for get all product details from database
// search by name
// Filter by category, base type, platformType
// Sorting by Price and Rating , it can be low to high and high to low
// Selectable field is sku details and feedbackers [ Only 5 feedbackers will be selected ]
// Pagination
