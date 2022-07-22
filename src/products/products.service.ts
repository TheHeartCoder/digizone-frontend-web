import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { skuDtoArrDto } from './dto/sku.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
  ) {}
  // create a new product
  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.productDB.createProductInDB(
        createProductDto,
      );
      return {
        message: 'Product created successfully',
        data: createdProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  // update a new product
  async updateProduct(id: string, updateProductDto: CreateProductDto) {
    try {
      const resOfUpdateProduct = await this.productDB.updateProductDetailsInDB(
        id,
        updateProductDto,
      );
      if (
        resOfUpdateProduct.modifiedCount &&
        resOfUpdateProduct.modifiedCount < 1
      ) {
        throw new Error('Nothing happened');
      }
      return {
        message: 'Product updated successfully',
        data: {
          id,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    try {
      const productDetails = await this.productDB.getProductDetailsById(id);
      if (!productDetails) throw new Error('No product found');
      return {
        message: 'Product found',
        data: productDetails,
      };
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
      if (!id) throw new Error('No product id to delete');
      const deletedProduct = await this.productDB.deleteProductDetailsInDB(id);
      if (!deletedProduct) throw new Error('No product found');
      return {
        message: 'Product deleted successfully',
        data: {
          id,
          deletedProduct,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Update with array of sku details in product
  async updateWithArrayOfSkuDetailsInDB(id: string, data: skuDtoArrDto) {
    try {
      if (!data.skuDetails || (data.skuDetails && data.skuDetails.length < 1))
        throw new Error('No sku details to update');
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
    } catch (error) {
      throw error;
    }
  }

  // update individual product sku details
  async updateProductIndividualSkuDetails(
    id: string,
    skuId: string,
    data: skuDtoArrDto,
  ): Promise<any> {
    try {
      if (
        !data.skuDetails ||
        !id ||
        !skuId ||
        (data.skuDetails && data.skuDetails.length < 1)
      )
        throw new Error('No sku details to update');

      const result = await this.productDB.updateSkuDetailsInDB(
        id,
        skuId,
        data.skuDetails,
      );

      if (result.modifiedCount < 1) throw new Error('No product found');
      return {
        message: 'Product sku details updated successfully',
        data: {
          id,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
