import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  stripeCustomerId: string;

  @IsString()
  @IsNotEmpty()
  PriceId: string;

  @IsString()
  @IsOptional()
  paymentMethodId?: string;
}
