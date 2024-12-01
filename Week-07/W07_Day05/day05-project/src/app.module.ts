import { Module } from '@nestjs/common';
import { StripeService } from './modules/stripe/stripe.service';
import { TwilioService } from './modules/twilio/twilio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionController } from './modules/user-subscription/user-subscription.controller';
import { ConfigModule } from '@nestjs/config';
import {
  UserSubscription,
  UserSubscriptionSchema,
} from './modules/user-subscription/user-subscription.schema';
import { ResponseHandler } from 'utility/success.response';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/stripe'),
    MongooseModule.forFeature([
      { name: UserSubscription.name, schema: UserSubscriptionSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [UserSubscriptionController],
  providers: [StripeService, TwilioService, ResponseHandler],
})
export class AppModule {}
