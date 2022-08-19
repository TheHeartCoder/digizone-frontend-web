import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { skuDto, skuDtoArrDto } from './dto/sku.dto';
import qs2m from 'qs-to-mongo';
import cloudinary from 'cloudinary';
import { GetProductQueryDto } from './dto/get-product.dto';
import config from 'config';
import fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
  ) {
    cloudinary.v2.config({
      cloud_name: config.get('cloudinary.cloud_name'),
      api_key: config.get('cloudinary.api_key'),
      api_secret: config.get('cloudinary.api_secret'),
    });
  }

  // product image upload
  async uploadProductImage(id: string, file: any): Promise<any> {
    // upload file [image] to cloudinary
    const resOfCludinary = await cloudinary.v2.uploader.upload(file.path, {
      folder: config.get('cloudinary.folderPath'),
      public_id: `${config.get('cloudinary.publicId_prefix')}` + Date.now(),
      transformation: [
        {
          width: config.get('cloudinary.bigSize').toString().split('X')[0],
          height: config.get('cloudinary.bigSize').toString().split('X')[1],
          crop: 'fill',
        },
        { quality: 'auto' },
      ],
    });

    // remove the file from local
    fs.unlinkSync(file.path);
    // update product image details in db
    await this.productDB.updateProductImageDetailsInDB(id, {
      image: resOfCludinary.secure_url,
      imageDetails: resOfCludinary,
    });

    return {
      message: 'Product image uploaded successfully',
      result: {
        image: resOfCludinary.secure_url,
      },
    };
  }

  // create a new product
  async create(createProductDto: CreateProductDto): Promise<{
    message: string;
    result: Record<string, any>;
  }> {
    const createdProduct = await this.productDB.createProductInDB(
      createProductDto,
    );
    return {
      message: 'Product created successfully',
      result: createdProduct,
    };
  }

  // update a new product
  async updateProduct(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<{
    message: string;
    result: Record<string, any>;
  }> {
    const updatedProduct = await this.productDB.updateProductDetailsInDB(
      id,
      updateProductDto,
    );
    return {
      message: 'Product updated successfully',
      result: updatedProduct,
    };
  }
  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    const product = await this.productDB.getProductDetailsById(id);
    if (!product) throw new BadRequestException('No product found');
    const relatedProducts = await this.productDB.getRelatedProducts(
      product.category,
    );
    return {
      message: 'Product found',
      result: { product, relatedProducts },
    };
  }

  // get all products with sorting and filtering
  async getAllProducts(queryDetails: GetProductQueryDto): Promise<{
    message: string;
    success: boolean;
    result: {
      metadata: {
        skip: number;
        limit: number;
        total: number;
        pages: number;
        links: any;
      };
      products: [];
    };
  }> {
    const data = qs2m(queryDetails);
    const { criteria, options, links } = data;

    const { total, result } = await this.productDB.getAllProductsFromDB(
      criteria,
      options,
    );
    return {
      message: result.length > 0 ? 'Products found' : 'No products found',
      success: true,
      result: {
        metadata: {
          skip: options.skip || 0,
          limit: options.limit,
          total,
          pages: options.limit ? Math.ceil(total / options.limit) : 1,
          links: links(`/`, total),
        },
        products: result,
      },
    };
  }

  // Delete a product
  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productDB.deleteProductDetailsInDB(id);
    if (!deletedProduct) throw new BadRequestException('No product found');
    // delete image from cloudinary server
    await cloudinary.v2.uploader.destroy(
      deletedProduct.imageDetails.public_id,
      {
        invalidate: true,
      },
    );
    // delete all licenceKeys from db
    await this.productDB.deleteAllLicenseKeysForProductInDB(id, undefined);
    return {
      message: 'Product deleted successfully',
      data: {
        id,
        deletedProduct,
      },
    };
  }

  // Update with array of sku details in product
  async updateWithArrayOfSkuDetailsInDB(id: string, data: skuDtoArrDto) {
    const result = await this.productDB.updateWithArrayOfSkuDetailsInDB(
      id,
      data.skuDetails,
    );

    return {
      message: 'Product sku details successfully',
      success: true,
      result,
    };
  }

  // update individual product sku details
  async updateProductIndividualSkuDetails(
    id: string,
    skuId: string,
    data: skuDto,
  ): Promise<any> {
    const result = await this.productDB.updateSkuDetailsInDB(id, skuId, data);

    return {
      message: 'Product sku details updated successfully',
      success: true,
      result,
    };
  }

  // Delete individual product sku details
  async deleteProductSkuDetails(id: string, skuId: string) {
    if (!skuId) throw new BadRequestException('No sku details to delete');
    await this.productDB.deleteSkuDetailsInDB(id, skuId);
    // delete all licenceKeys from db
    await this.productDB.deleteAllLicenseKeysForProductInDB(undefined, skuId);

    return {
      message: 'Product sku details deleted successfully',
      success: true,
      data: {
        id,
      },
    };
  }
  // add license keys for an product sku
  async addLicenseKeysForProductSku(
    id: string,
    skuId: string,
    licenseKey: string,
  ): Promise<any> {
    const result = await this.productDB.addLicenseKeysForProductSkuInDB(
      id,
      skuId,
      licenseKey,
    );
    return {
      message: 'License keys added successfully',
      success: true,
      result: result,
    };
  }

  // delete a license key
  async deleteLicenseKeysForProductSku(id: string) {
    const result = await this.productDB.deleteLicenseKeysForProductSkuInDB(id);

    return {
      message: 'License keys deleted successfully',
      success: true,
      result: result,
    };
  }

  // get license keys for a product sku
  async getAllLicenseKeysForProduct(id: string, skuId: string) {
    const result = await this.productDB.getAllLicenseKeysForProductInDB(
      id,
      skuId,
    );

    return {
      message: 'License keys found',
      success: true,
      result: result,
    };
  }

  // update license keys for a product sku
  async updateLicenseKeysForProductSku(
    productId: string,
    skuId: string,
    licenseKeyId: string,
    licenseKey: string,
  ): Promise<any> {
    const result = await this.productDB.updateLicenseKeysForProductSkuInDB(
      productId,
      skuId,
      licenseKeyId,
      licenseKey,
    );

    return {
      message: 'License keys updated successfully',
      success: true,
      result: result,
    };
  }
}
