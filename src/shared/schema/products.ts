import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128, Document, Types } from 'mongoose';

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
  Mobile = 'Mobile',
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

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  customer: Types.ObjectId;

  @Prop({})
  rating: Decimal128;

  @Prop({})
  feedbackMsg: string;
}
export class FeedbackSchema {
  @Prop({})
  avgRating: string;

  @Prop({})
  info: [Feebackers];
}

export class SkuDetailsSchema {
  @Prop({})
  skuName: string; // name of the sku

  @Prop({ required: true })
  price: Decimal128;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  validityAmount: Int32Array;

  @Prop({
    default: '',
    enum: [durationType.day, durationType.month, durationType.year],
  })
  durationType: string;

  @Prop({ default: false })
  lifetime: boolean;

  licenceKeys: [string];
}

export class Products extends Document {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
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

  @Prop({ required: true, enum: [baseType.computer, baseType.Mobile] })
  baseType: string;

  @Prop({ required: true })
  productUrl: string;

  @Prop({ required: true })
  downloadUrl: string;

  @Prop({})
  installationFileUrl: string;

  @Prop({})
  feedbackDetails: FeedbackSchema;

  @Prop({})
  skuDetails: [SkuDetailsSchema];
}

export const ProductSchema = SchemaFactory.createForClass(Products);
