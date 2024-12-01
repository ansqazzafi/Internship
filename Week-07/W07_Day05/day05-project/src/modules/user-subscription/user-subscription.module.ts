// user-subscription.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionController } from './user-subscription.controller';
import {
  UserSubscription,
  UserSubscriptionSchema,
} from './user-subscription.schema';
import { StripeService } from '../stripe/stripe.service';
import { TwilioService } from '../twilio/twilio.service';
import { ResponseHandler } from 'utility/success.response';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/stripe')],
  providers: [StripeService, TwilioService, ResponseHandler],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}
