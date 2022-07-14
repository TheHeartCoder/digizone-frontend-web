import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Products } from '../schema/products';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
  ) {}

  // create product details
  async createProductInDB(data: CreateProductDto): Promise<Products> {
    const product = new this.productModel(data);
    return await product.save();
  }

  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    const product = await this.productModel.findById(id);
    return product;
  }

  // update product details
  async updateProductDetailsInDB(
    id: string,
    data: CreateProductDto,
  ): Promise<any> {
    return await this.productModel.findByIdAndUpdate(id, data);
  }

  // delete product details
  async deleteProductDetailsInDB(id: string): Promise<any> {
    return await this.productModel.findByIdAndDelete(id);
  }

  // get all products with sorting and filtering
  async getAllProducts(
    sortBy: string,
    sortOrder: string,
    filterBy: string,
    filterValue: any,
  ): Promise<any> {
    // aggregation
    const pipeline: any = [
      { $match: filterBy && filterValue ? { [filterBy]: filterValue } : {} },
      { $sort: { [sortBy]: sortOrder } },
    ];
    return await this.productModel.aggregate(pipeline);
  }

  // update with array of sku details in product
  async updateWithArrayOfSkuDetailsInDB(id: string, data: [any]): Promise<any> {
    return await this.productModel.updateOne(
      { _id: id },
      { $push: { skuDetails: { $each: data } } },
    );
  }
}
