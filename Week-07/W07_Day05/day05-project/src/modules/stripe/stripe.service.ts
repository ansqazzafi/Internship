import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { TwilioService } from '../twilio/twilio.service';
import { CustomError } from 'utility/customerror';
import { InjectModel } from '@nestjs/mongoose';
import { UserSubscription } from '../user-subscription/user-subscription.schema';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../user-subscription/dto/create-customer.dto';
import { SuccessHandler } from 'interface/response.interface';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly twilioService: TwilioService,
    @InjectModel(UserSubscription.name)
    private userSubscriptionModel: Model<UserSubscription>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCustomer(CreateCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.stripe.customers.create({
        ...CreateCustomerDto,
      });
      const newSubscription = new this.userSubscriptionModel({
        ...CreateCustomerDto,
        stripeCustomerId: customer.id,
      });

      await newSubscription.save();
      await this.twilioService.SendConfirmationSms(
        CreateCustomerDto.phone,
        'Customer created in stripe succesfully',
      );
      return customer;
    } catch (error) {
      throw new CustomError(`Error creating customer: ${error.message}`, 401);
    }
  }

  async createSubscription(
    createSubscriptionDto,
  ): Promise<object> {
    const { stripeCustomerId, PriceId } = createSubscriptionDto;

    try {
      const customer = await this.stripe.customers.retrieve(stripeCustomerId);
      if (!customer) {
        throw new CustomError('Customer does not exist', 401);
      }

      const subscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: PriceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
      if (!paymentIntent || !paymentIntent.client_secret) {
        throw new CustomError('Payment intent client secret not found', 404);
      }

      const clientSecret = paymentIntent.client_secret;

      return { clientSecret: clientSecret }
    } catch (error) {
      console.error('Error creating subscription: ', error);
      throw new CustomError('Failed to create subscription', 404);
    }
  }


  getPlanNameFromPriceId(priceId: string): string {
    const planNames = {
      price_1QRGbCAol0Em8U0txodYNM8K: 'Basic Plan',
      price_1QRGbUAol0Em8U0tVfuWi9ff: 'Standard Plan',
      price_1QRGblAol0Em8U0tT0lVo7AT: 'Premium Plan',
    };

    return planNames[priceId] || 'Unknown Plan';
  }


  async updateDetails(customerId: string, subscription, PriceId: string): Promise<void> {
    try {
      const customerResponse = await this.stripe.customers.retrieve(customerId);
      const user = await this.userSubscriptionModel.findOneAndUpdate(
        { stripeCustomerId: customerId },
        {
          subscriptionId: subscription.id,
          status: subscription.status,
          priceId: PriceId,
          startDate: new Date(subscription.current_period_start * 1000),
          endDate: new Date(subscription.current_period_end * 1000),
        },
        { new: true },
      );

      const customer = customerResponse as Stripe.Customer;
      const phoneNumber = customer.phone;

      if (phoneNumber) {
        const planName = this.getPlanNameFromPriceId(PriceId);
        const message = `Hi ${user.name},\nYour subscription to the ${planName} plan has been successfully created! Thank you for subscribing!`;
        await this.twilioService.SendConfirmationSms(phoneNumber, message);
      } else {
        console.log('No phone number found for customer.');
      }
    } catch (error) {
      console.error('Error retrieving customer or updating subscription:', error);
      throw new CustomError("Error retrieving customer", 404);
    }

  }



  async handleStripeWebhook(
    payload: any,
    signature: string,
    endpointSecret: string,
  ): Promise<void> {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err) {
      console.error('Error verifying webhook signature:', err);
      throw new CustomError('Webhook signature verification failed', 401);
    }

    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;
      if (!invoice.subscription || typeof invoice.subscription === 'string') {
        console.log('No valid subscription found in the invoice.');
        throw new CustomError("Subscription not found", 404);
      }

      const subscription = invoice.subscription as Stripe.Subscription;
      const PriceId = invoice.lines.data.length > 0 ? invoice.lines.data[0].price.id : null;

      if (!PriceId) {
        console.log('Price ID not found in the invoice.');
        throw new CustomError("Price id not found", 404);
      }
      this.updateDetails(customerId, subscription, PriceId)
      return
    }
    if (event.type === 'invoice.payment_failed') {
      throw new CustomError("Payment failed", 403)
    }
  }
}
