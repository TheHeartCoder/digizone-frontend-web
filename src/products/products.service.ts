import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { skuDto, skuDtoArrDto } from './dto/sku.dto';
import qs2m from 'qs-to-mongo';
import { GetProductQueryDto } from './dto/get-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
  ) {}
  // create a new product
  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productDB.createProductInDB(
      createProductDto,
    );
    return {
      message: 'Product created successfully',
      data: createdProduct,
    };
  }

  // update a new product
  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    await this.productDB.updateProductDetailsInDB(id, updateProductDto);
    return {
      message: 'Product updated successfully',
      data: {
        id,
      },
    };
  }
  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    const productDetails = await this.productDB.getProductDetailsById(id);
    if (!productDetails) throw new BadRequestException('No product found');
    return {
      message: 'Product found',
      data: productDetails,
    };
  }

  // get all products with sorting and filtering
  async getAllProducts(queryDetails: GetProductQueryDto): Promise<{
    message: string;
    data: {
      skip: number;
      limit: number;
      total: number;
      pages: number;
      links: any;
      result: [];
    };
  }> {
    const data = qs2m(queryDetails);
    const { criteria, options, links } = data;
    console.log('criteria :: ', data, criteria, options, links);
    const { total, result } = await this.productDB.getAllProductsFromDB(
      criteria,
      options,
    );
    return {
      message: 'Products found',
      data: {
        skip: options.skip || 0,
        limit: options.limit,
        total,
        pages: options.limit ? Math.ceil(total / options.limit) : 1,
        links: links(`/`, total),
        result,
      },
    };
  }

  // Delete a product
  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productDB.deleteProductDetailsInDB(id);
    if (!deletedProduct) throw new BadRequestException('No product found');
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

    if (result.modifiedCount < 1) throw new Error('No product found');
    return {
      message: 'Product sku details successfully',
      data: {
        id,
      },
    };
  }

  // update individual product sku details
  async updateProductIndividualSkuDetails(
    id: string,
    skuId: string,
    data: skuDto,
  ): Promise<any> {
    const result = await this.productDB.updateSkuDetailsInDB(id, skuId, data);

    if (result.modifiedCount < 1) throw new Error('No product found');
    return {
      message: 'Product sku details updated successfully',
      data: {
        id,
      },
    };
  }

  // Delete individual product sku details
  async deleteProductSkuDetails(
    id: string,
    skuIds: [string],
    allDelete = false,
  ) {
    if (!skuIds || !skuIds.length || (!allDelete && !skuIds))
      throw new BadRequestException('No sku details to delete');
    await this.productDB.deleteSkuDetailsInDB(id, skuIds, allDelete);
    return {
      message: 'Product sku details deleted successfully',
      data: {
        id,
      },
    };
  }
}
