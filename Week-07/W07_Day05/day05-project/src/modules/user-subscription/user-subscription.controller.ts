import { Controller, Post, Body } from '@nestjs/common';
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
  ) {}

  @Post('create-customer')
  async createCustomer(
    @Body() CreateCustomerDto: CreateCustomerDto,
  ): Promise<SuccessHandler<any>> {
    console.log;
    const customer = await this.stripeService.createCustomer(CreateCustomerDto);
    return this.responseHandler.successHandler(null, 'Customer created');
  }

  @Post('create-subscription')
  async createSubscription(
    @Body() CreateSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SuccessHandler<any>> {
    console.log('f', CreateSubscriptionDto);
    const customer = await this.stripeService.createSubscription(
      CreateSubscriptionDto,
    );
    return this.responseHandler.successHandler(
      null,
      'Subscription created Successfully',
    );
  }
}
