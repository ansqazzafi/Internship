// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async handleWebhook(body: any) {
    switch (body.type) {
      case 'payment_intent.created':
        console.log('sucess');
        return { status: 'success' };
      case 'payment_intent.payment_failed':
        console.log('failed');
        return { status: 'failure' };
      default:
        return { status: 'failure', message: 'Unhandled event type' };
    }
  }
}
