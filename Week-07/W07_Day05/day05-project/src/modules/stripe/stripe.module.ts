import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioService } from '../twilio/twilio.service';
import { StripeService } from './stripe.service';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/stripe')],
  controllers: [],
  providers: [TwilioService, StripeService],
})
export class StripeModule { }

