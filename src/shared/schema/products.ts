import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from './users';

export enum categoryType {
  operatingSystem = 'Operating System',
  applicationSoftware = 'Application Software',
}

export enum platformType {
  windows = 'Windows',
  android = 'Android',
  ios = 'iOS',
  linux = 'Linux',
  mac = 'Mac',
}

export enum baseType {
  computer = 'Computer',
  mobile = 'Mobile',
}

export enum durationType {
  day = 'Day',
  month = 'Month',
  year = 'Year',
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Feebackers {
  @Prop({})
  customerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  customer: Users; // User schema

  @Prop({})
  rating: number;

  @Prop({})
  feedbackMsg: string;
}
export const FeebackersSchema = SchemaFactory.createForClass(Feebackers);

export class FeedbackSchema {
  @Prop({})
  avgRating: string;

  @Prop([{ type: FeebackersSchema }])
  info: Feebackers[];
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class SkuDetails {
  @Prop({})
  _id: string;

  @Prop({})
  skuName: string; // name of the sku

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  validityAmount: number;

  @Prop({
    default: '',
    enum: [durationType.day, durationType.month, durationType.year],
  })
  durationType: string;

  @Prop({ default: false })
  lifetime: boolean;

  @Prop({ required: true })
  licenceKeys: [string];
}

export const SkuDetailsSchema = SchemaFactory.createForClass(SkuDetails);

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Products {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true, type: {} })
  description: Record<string, any>;

  @Prop({})
  image: string;

  @Prop({
    required: true,
    enum: [categoryType.operatingSystem, categoryType.applicationSoftware],
  })
  category: string;

  @Prop({
    required: true,
    enum: [
      platformType.android,
      platformType.ios,
      platformType.windows,
      platformType.linux,
      platformType.mac,
    ],
  })
  platformType: string;

  @Prop({ required: true, enum: [baseType.computer, baseType.mobile] })
  baseType: string;

  @Prop({ required: true })
  productUrl: string;

  @Prop({ required: true })
  downloadUrl: string;

  @Prop({})
  installationFileUrl: string;

  @Prop({})
  feedbackDetails: FeedbackSchema;

  @Prop([{ type: SkuDetailsSchema }])
  skuDetails: SkuDetails[];

  @Prop({ type: {} })
  imageDetails: Record<string, any>;

  @Prop({ type: {} })
  requirmentSpecification: Record<string, any>;

  @Prop({ type: {} })
  highlights: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
