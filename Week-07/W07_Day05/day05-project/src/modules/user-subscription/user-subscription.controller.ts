import { Controller, Post, Body, Headers } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { SuccessHandler } from 'interface/response.interface';
import { UserSubscription } from './user-subscription.schema';
import { ResponseHandler } from 'utility/success.response';
import { CustomError } from 'utility/customerror';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly responseHandler: ResponseHandler,
  ) { }

  @Post('customers')
  async createCustomer(
    @Body() CreateCustomerDto: CreateCustomerDto,
  ): Promise<SuccessHandler<any>> {
    console.log;
    const customer = await this.stripeService.createCustomer(CreateCustomerDto);
    return this.responseHandler.successHandler(null, 'Customer created');
  }

  @Post('subscriptions')
  async createSubscription(
    @Body() CreateSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SuccessHandler<any>> {
    console.log('f', CreateSubscriptionDto);
    const customer = await this.stripeService.createSubscription(
      CreateSubscriptionDto,
    );
    return this.responseHandler.successHandler(
      customer,
      'Subscription created Successfully',
    );
  }



  @Post()
  async handleStripeWebhook(
    @Body() payload: any,
    @Headers('stripe-signature') signature: string,
  ): Promise<any> {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      await this.stripeService.handleStripeWebhook(payload, signature, endpointSecret);
      return { received: true };
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw new CustomError('Webhook failed', 403);
    }
  }
}
