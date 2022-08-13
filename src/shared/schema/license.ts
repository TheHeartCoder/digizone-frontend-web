import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class License {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  })
  product: string;

  @Prop({
    required: true,
    type: String,
  })
  productSku: string;
  @Prop({
    required: true,
    type: String,
  })
  licenseKey: string;
  @Prop({
    default: false,
    type: Boolean,
  })
  isSold: boolean;
}

export const LicenseSchema = SchemaFactory.createForClass(License);

//https://fakerjs.dev/api/
