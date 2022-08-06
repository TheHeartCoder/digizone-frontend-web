import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from '../../shared/schema/products';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class ProductSeeder implements Seeder {
  constructor(
    @InjectModel(Products.name) private readonly products: Model<Products>,
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const products = DataFactory.createForClass(Products).generate(25);

    // Insert into the database.
    return this.products.insertMany(products);
  }

  async drop(): Promise<any> {
    return this.products.deleteMany({});
  }
}
