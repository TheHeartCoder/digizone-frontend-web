import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const ProductSchema = SchemaFactory.createForClass(Products);
