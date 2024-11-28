// stripe.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/createpayment.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    const { amount, currency } = createPaymentDto;
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
    return { clientSecret: paymentIntent.client_secret };
  }
}
