// stripe.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/createpayment.dto';
import { log } from 'console';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    const { amount, currency } = createPaymentDto;
    console.log(amount, currency);

    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }
}
