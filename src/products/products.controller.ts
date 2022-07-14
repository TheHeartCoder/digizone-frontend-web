import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
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

  @Post('/sku')
  updateProductSkuDetails(
    @Param('id') id: string,
    @Body()
    data: any,
  ) {
    return this.productsService.updateWithArrayOfSkuDetailsInDB(id, data);
  }
}
