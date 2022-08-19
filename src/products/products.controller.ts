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
import { Roles } from 'src/shared/middleware/roles.decorators';
import { userTypes } from 'src/shared/schema/users';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/:id/image')
  @Roles(userTypes.admin)
  @UseInterceptors(
    FileInterceptor('productImage', {
      dest: config.get('fileStoragePath'),
      limits: {
        fileSize: 3145728, // 3MB
      },
    }),
  )
  @HttpCode(200)
  @Roles(userTypes.admin)
  uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: ParameterDecorator,
  ) {
    return this.productsService.uploadProductImage(id, file);
  }

  @Post()
  @Roles(userTypes.admin)
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
  @Roles(userTypes.admin)
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(userTypes.admin)
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('/:productId/skus')
  @Roles(userTypes.admin)
  updateProductSkuDetails(
    @Param('productId') productId: string,
    @Body() skuDetails: skuDtoArrDto,
  ) {
    return this.productsService.updateWithArrayOfSkuDetailsInDB(
      productId,
      skuDetails,
    );
  }

  @Put('/:productId/skus/:skuId')
  updateProductIndividualSkuDetails(
    @Param('productId') id: string,
    @Param('skuId') skuId: string,
    @Body() skuDetails: skuDto,
  ) {
    console.log(skuDetails);
    return this.productsService.updateProductIndividualSkuDetails(
      id,
      skuId,
      skuDetails,
    );
  }

  @Delete('/:productId/skus/:skuId')
  @Roles(userTypes.admin)
  deleteProductSkuDetails(
    @Param('productId') id: string,
    @Param('skuId') skuId: string,
  ) {
    return this.productsService.deleteProductSkuDetails(id, skuId);
  }

  @Post('/:productId/skus/:skuId/licenses')
  @Roles(userTypes.admin)
  addLicenseKeysForProductSku(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Body('licenseKey') licenseKey: string,
  ) {
    return this.productsService.addLicenseKeysForProductSku(
      productId,
      skuId,
      licenseKey,
    );
  }

  @Delete('/licenses/:licenseKeyId')
  @Roles(userTypes.admin)
  deleteLicenseKeysForProductSku(@Param('licenseKeyId') licenseKeyId: string) {
    return this.productsService.deleteLicenseKeysForProductSku(licenseKeyId);
  }

  @Get('/:productId/skus/:skuId/licenses')
  @Roles(userTypes.admin)
  getAllLicenseKeysForProduct(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
  ) {
    return this.productsService.getAllLicenseKeysForProduct(productId, skuId);
  }

  @Put('/:productId/skus/:skuId/licenses/:licenseKeyId')
  @Roles(userTypes.admin)
  updateLicenseKeysForProductSku(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Param('licenseKeyId') licenseKeyId: string,
    @Body('licenseKey') licenseKey: string,
  ) {
    return this.productsService.updateLicenseKeysForProductSku(
      productId,
      skuId,
      licenseKeyId,
      licenseKey,
    );
  }
}
