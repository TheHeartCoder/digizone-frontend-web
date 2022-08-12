import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum userTypes {
  admin = 'admin',
  customer = 'customer',
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Users extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: [userTypes.admin, userTypes.customer] })
  type: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Date, default: null })
  otpExpiryTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
