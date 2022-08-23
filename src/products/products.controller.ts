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
  Req,
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
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: ParameterDecorator,
  ) {
    return await this.productsService.uploadProductImage(id, file);
  }

  @Post()
  @Roles(userTypes.admin)
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() queryDetails: GetProductQueryDto) {
    return this.productsService.getAllProducts(queryDetails);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.getProductDetailsById(id);
  }

  @Patch(':id')
  @Roles(userTypes.admin)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(userTypes.admin)
  async remove(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }

  @Post('/:productId/skus')
  @Roles(userTypes.admin)
  async updateProductSkuDetails(
    @Param('productId') productId: string,
    @Body() skuDetails: skuDtoArrDto,
  ) {
    return await this.productsService.updateWithArrayOfSkuDetailsInDB(
      productId,
      skuDetails,
    );
  }

  @Put('/:productId/skus/:skuId')
  async updateProductIndividualSkuDetails(
    @Param('productId') id: string,
    @Param('skuId') skuId: string,
    @Body() skuDetails: skuDto,
  ) {
    console.log(skuDetails);
    return await this.productsService.updateProductIndividualSkuDetails(
      id,
      skuId,
      skuDetails,
    );
  }

  @Delete('/:productId/skus/:skuId')
  @Roles(userTypes.admin)
  async deleteProductSkuDetails(
    @Param('productId') id: string,
    @Param('skuId') skuId: string,
  ) {
    return await this.productsService.deleteProductSkuDetails(id, skuId);
  }

  @Post('/:productId/skus/:skuId/licenses')
  @Roles(userTypes.admin)
  async addLicenseKeysForProductSku(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Body('licenseKey') licenseKey: string,
  ) {
    return await this.productsService.addLicenseKeysForProductSku(
      productId,
      skuId,
      licenseKey,
    );
  }

  @Delete('/licenses/:licenseKeyId')
  @Roles(userTypes.admin)
  async deleteLicenseKeysForProductSku(
    @Param('licenseKeyId') licenseKeyId: string,
  ) {
    return await this.productsService.deleteLicenseKeysForProductSku(
      licenseKeyId,
    );
  }

  @Get('/:productId/skus/:skuId/licenses')
  @Roles(userTypes.admin)
  async getAllLicenseKeysForProduct(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
  ) {
    return await this.productsService.getAllLicenseKeysForProduct(
      productId,
      skuId,
    );
  }

  @Put('/:productId/skus/:skuId/licenses/:licenseKeyId')
  @Roles(userTypes.admin)
  async updateLicenseKeysForProductSku(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Param('licenseKeyId') licenseKeyId: string,
    @Body('licenseKey') licenseKey: string,
  ) {
    return await this.productsService.updateLicenseKeysForProductSku(
      productId,
      skuId,
      licenseKeyId,
      licenseKey,
    );
  }

  @Post('/:productId/reviews')
  async addReview(
    @Param('productId') productId: string,
    @Body('rating') rating: number,
    @Body('review') review: string,
    @Req() req: any,
  ) {
    return await this.productsService.addReview(
      productId,
      rating,
      review,
      req.user,
    );
  }

  @Delete('/:productId/reviews/:reviewId')
  async deleteReview(
    @Param('productId') productId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.productsService.deleteReview(productId, reviewId);
  }
}
