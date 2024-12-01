import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { TwilioService } from '../twilio/twilio.service';
import { CustomError } from 'utility/customerror';
import { InjectModel } from '@nestjs/mongoose';
import { UserSubscription } from '../user-subscription/user-subscription.schema';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../user-subscription/dto/create-customer.dto';

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
  ): Promise<Stripe.Subscription> {
    const { stripeCustomerId, PriceId } = createSubscriptionDto;

    try {
      const customer = await this.stripe.customers.retrieve(stripeCustomerId);
      if (!customer) {
        throw new CustomError('Customer does not exist', 401);
      }
      const paymentMethod = await this.createPaymentMethod();
      if (!paymentMethod) {
        throw new CustomError('Failed to create payment method', 401);
      }
      console.log(paymentMethod, 'created paymentmethod');
      await this.attachPaymentMethodToCustomer(customer.id, paymentMethod.id);
      const subscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: PriceId,
          },
        ],
      });
      const planName = this.getPlanNameFromPriceId(PriceId);
      const user = await this.userSubscriptionModel.findOneAndUpdate(
        { stripeCustomerId: customer.id },
        {
          subscriptionId: subscription.id,
          status: subscription.status,
          priceId: PriceId,
          startDate: new Date(subscription.current_period_start * 1000),
          endDate: new Date(subscription.current_period_end * 1000),
        },
        { new: true },
      );

      console.log(user, user.phone);

      const message = `Hi ${user.name},\nYour subscription to the ${planName} plan has been successfully created!\nStart Date: ${user.startDate.toLocaleDateString()}\nEnd Date: ${user.endDate.toLocaleDateString()}\nThank you for subscribing!`;
      await this.twilioService.SendConfirmationSms(user.phone, message);
      return subscription;
    } catch (error) {
      console.error('Error creating subscription: ', error);
      throw new CustomError('Failed to create subscription', 404);
    }
  }

  async createPaymentMethod() {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: 'tok_visa',
        },
      });

      console.log('Payment Method Created:', paymentMethod);
      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method: ', error);
      throw new CustomError(`Failed to create payment method. Error`, 404);
    }
  }

  async attachPaymentMethodToCustomer(
    customerId: string,
    paymentMethodId: string,
  ) {
    try {
      await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      console.log('attached');
    } catch (error) {
      console.error('Error attaching payment method to customer: ', error);
      throw new CustomError('Failed to attach payment method to customer', 404);
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
}
