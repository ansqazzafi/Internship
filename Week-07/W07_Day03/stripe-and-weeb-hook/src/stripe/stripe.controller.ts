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
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Body() body: any) {
    console.log(body.type, 'Entered');
    const result = await this.stripeService.handleWebhook(body);
    return result;
  }
}
