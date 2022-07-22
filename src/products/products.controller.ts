import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { skuDtoArrDto } from './dto/sku.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: any,
    @Query('filterBy') filterBy: string,
    @Query('filterValue') filterValue: any,
  ) {
    return this.productsService.getAllProducts(
      sortBy,
      sortOrder,
      filterBy,
      filterValue,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getProductDetailsById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('/sku/:id')
  updateProductSkuDetails(
    @Param('id') id: string,
    @Body() skuDetails: skuDtoArrDto,
  ) {
    return this.productsService.updateWithArrayOfSkuDetailsInDB(id, skuDetails);
  }

  @Put('/sku/:productId/:skuId')
  updateProductIndividualSkuDetails(
    @Param('productId') id: string,
    @Param('skuId') skuId: string,
    @Body() skuDetails: skuDtoArrDto,
  ) {
    return this.productsService.updateProductIndividualSkuDetails(
      id,
      skuId,
      skuDetails,
    );
  }
}
