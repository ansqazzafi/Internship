// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { CustomError } from 'utility/customerror';

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
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new CustomError(
        `Failed to create payment intent. Error: ${error.message || 'Unknown error'}`,
        404,
      );
    }
  }
}
