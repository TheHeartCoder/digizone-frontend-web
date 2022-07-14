import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
  ) {}
  // create a new product
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productDB.createProductInDB(createProductDto);
    } catch (error) {
      throw error;
    }
  }

  // update a new product
  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    try {
      return await this.productDB.updateProductDetailsInDB(
        id,
        updateProductDto,
      );
    } catch (error) {
      throw error;
    }
  }
  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    try {
      return await this.productDB.getProductDetailsById(id);
    } catch (error) {
      throw error;
    }
  }

  // get all products with sorting and filtering
  async getAllProducts(
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filterBy: any,
    filterValue: any,
  ): Promise<any> {
    try {
      return await this.productDB.getAllProducts(
        sortBy,
        sortOrder,
        filterBy,
        filterValue,
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete a product
  async deleteProduct(id: string): Promise<any> {
    try {
      return await this.productDB.deleteProductDetailsInDB(id);
    } catch (error) {
      throw error;
    }
  }

  // Update with array of sku details in product
  async updateWithArrayOfSkuDetailsInDB(id: string, data: [any]) {
    try {
      return await this.productDB.updateWithArrayOfSkuDetailsInDB(id, data);
    } catch (error) {
      throw error;
    }
  }
}
