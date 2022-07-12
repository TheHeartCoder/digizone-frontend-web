import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128, Document } from 'mongoose';

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

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Feebackers {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  rating: Decimal128;

  @Prop({})
  feedbackMsg: string;
}
export class FeedbackSchema {
  @Prop({ required: true })
  avgRating: string;

  @Prop({ required: true })
  info: [Feebackers];
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
}

export const ProductSchema = SchemaFactory.createForClass(Products);
