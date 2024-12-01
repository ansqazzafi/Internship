import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserSubscription {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  stripeCustomerId: string;

  @Prop({ required: false })
  stripeSubscriptionId?: string;

  @Prop({ required: false })
  status?: string;

  @Prop({ required: false })
  priceId?: string;

  @Prop({ required: false })
  startDate?: Date;

  @Prop({ required: false })
  endDate?: Date;
}

export type UserSubscriptionDocument = UserSubscription & Document;
export const UserSubscriptionSchema =
  SchemaFactory.createForClass(UserSubscription);
