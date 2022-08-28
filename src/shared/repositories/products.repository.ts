import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

import { Products } from '../schema/products';
import { ParsedOptions } from 'qs-to-mongo/lib/query/options-to-mongo';
import { License } from '../schema/license';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
    @InjectModel(License.name)
    private readonly licenseModel: Model<License>,
  ) {}

  // create product details
  async createProductInDB(data: CreateProductDto): Promise<Products> {
    const product = new this.productModel(data);
    return await product.save();
  }

  // upadte image for product
  async updateProductImageDetailsInDB(
    id: string,
    imageDetails: Record<string, any>,
  ): Promise<any> {
    return await this.productModel.updateOne(
      { _id: id },
      { $set: { ...imageDetails } },
    );
  }

  // get product details by id
  async getProductDetailsById(id: string): Promise<any> {
    const product = await this.productModel.findById(id);
    return product;
  }

  // get related product details by id
  async getRelatedProducts(category: string): Promise<any> {
    const product = await this.productModel
      .find({ category: category, isSoldOut: false })
      .limit(4);
    return product;
  }

  // update product details
  async updateProductDetailsInDB(
    id: string,
    data: CreateProductDto,
  ): Promise<any> {
    return await this.productModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );
  }

  // delete product details
  async deleteProductDetailsInDB(id: string): Promise<any> {
    return await this.productModel.findByIdAndDelete(id);
  }

  // get all products with sorting and filtering
  async getAllProductsFromDB(
    criteria: Record<string, any>,
    options: ParsedOptions,
  ): Promise<any> {
    options.sort = options.sort || { _id: -1 };
    options.skip = options.skip || 0;
    options.limit = options.limit || 12;

    if (criteria.search) {
      criteria.productName = { $regex: new RegExp(criteria.search, 'i') };
      delete criteria.search;
    }

    // aggregate products with citeria and options
    const products = await this.productModel.aggregate([
      { $match: criteria },
      { $sort: options.sort },
      { $skip: options.skip },
      { $limit: options.limit },
    ]);
    // get total products count
    const total = await this.productModel.countDocuments(criteria);
    return {
      total,
      result: products,
    };
  }

  // get group wise product for dashboard
  async getGroupByProduct() {
    const products = await this.productModel.aggregate([
      {
        $facet: {
          latestProducts: [{ $sort: { createdAt: -1 } }, { $limit: 4 }],
          topSoldProducts: [{ $sort: { avgRating: -1 } }, { $limit: 8 }],
        },
      },
    ]);
    console.log(products);

    return products;
  }

  // update with array of sku details in product
  async updateWithArrayOfSkuDetailsInDB(
    id: string,
    data: Record<string, any>,
  ): Promise<any> {
    return await this.productModel.findOneAndUpdate(
      { _id: id },
      { $push: { skuDetails: { $each: data as any } } },
      {
        new: true,
      },
    );
  }

  // update sku details  in product
  async updateSkuDetailsInDB(
    id: string,
    skuId: string,
    data: Record<string, any>,
  ): Promise<any> {
    const dataForUpdate = {};
    Object.keys(data).forEach((key) => {
      dataForUpdate[`skuDetails.$.${key}`] = data[key];
    });
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: id, 'skuDetails._id': skuId },
      { $set: dataForUpdate },
      { new: true },
    );
    return updatedProduct;
  }

  // delete a sku details  in product
  async deleteSkuDetailsInDB(id: string, skuId: string): Promise<any> {
    return await this.productModel.findOneAndUpdate(
      { _id: id },
      { $pull: { skuDetails: { _id: skuId as any } } },
      {
        new: true,
      },
    );
  }

  // add license information in product
  async addLicenseKeysForProductSkuInDB(
    productId: string,
    skuId: string,
    licenseKey: string,
  ): Promise<any> {
    return await this.licenseModel.create({
      product: productId,
      productSku: skuId,
      licenseKey,
    });
  }

  // delete license keys in product
  async deleteLicenseKeysForProductSkuInDB(id: string) {
    return await this.licenseModel.deleteOne({ _id: id });
  }

  // get license keys in product
  async getAllLicenseKeysForProductInDB(id: string, skuId: string) {
    return await this.licenseModel.find({ product: id, productSku: skuId });
  }

  // update license keys in product
  async updateLicenseKeysForProductSkuInDB(
    id: string,
    skuId: string,
    licenseKeyId: string,
    licenseKey: string,
  ): Promise<any> {
    return await this.licenseModel.updateOne(
      { _id: licenseKeyId },
      { $set: { licenseKey, productSku: skuId, product: id } },
    );
  }

  // delete all license keys from product
  async deleteAllLicenseKeysForProductInDB(id: string, skuId: string) {
    if (id) return await this.licenseModel.deleteMany({ product: id });
    return await this.licenseModel.deleteMany({ productSku: skuId });
  }

  // get license keys for a sku in product
  async getLicenseKeysForProductSkuInDB(id: string, skuId: string) {
    return await this.licenseModel.find({ product: id, productSku: skuId });
  }

  // license update
  async updateLicenseKeysForProductSkuInDBV2(
    query: Record<string, any>,
    data: Record<string, any>,
  ): Promise<any> {
    return await this.licenseModel.findOneAndUpdate(
      query,
      { $set: data },
      { new: true },
    );
  }

  // update with array of reviews in product
  async addReviewForAProduct(
    id: string,
    avgRating: string,
    data: Record<string, any>,
  ): Promise<any> {
    return await this.productModel.findOneAndUpdate(
      { _id: id },
      { $set: { avgRating }, $push: { feedbackDetails: data } },
      {
        new: true,
      },
    );
  }

  // delete review for a product
  async deleteReviewForAProduct(productId: string, reviewId: string) {
    return await this.productModel.findOneAndUpdate(
      { _id: productId },
      { $pull: { feedbackDetails: { _id: reviewId as any } } },
      {
        new: true,
      },
    );
  }

  // check license in stock or not
  async getLicenseForASku(skuId: string) {
    return await this.licenseModel.find({ productSku: skuId, isSold: false });
  }
}
