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
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { skuDtoArrDto, skuDto } from './dto/sku.dto';
import { GetProductQueryDto } from './dto/get-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import config from 'config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('productImage', {
      dest: config.get('fileStoragePath'),
      limits: {
        fileSize: 3145728, // 3MB
      },
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: ParameterDecorator,
  ) {
    console.log(createProductDto, file);
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll(@Query() queryDetails: GetProductQueryDto) {
    return this.productsService.getAllProducts(queryDetails);
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
    @Body() skuDetails: skuDto,
  ) {
    return this.productsService.updateProductIndividualSkuDetails(
      id,
      skuId,
      skuDetails,
    );
  }

  @Delete('/sku/:productId')
  deleteProductSkuDetails(
    @Param('productId') id: string,
    @Body('skuIds') skuIds: [string],
    @Query('deleteAll') deleteAll: boolean,
  ) {
    return this.productsService.deleteProductSkuDetails(id, skuIds, deleteAll);
  }
}
