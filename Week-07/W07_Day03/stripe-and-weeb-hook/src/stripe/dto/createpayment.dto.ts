// create-payment.dto.ts
import { IsString, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  
  @IsNotEmpty() 
  @IsInt() 
  @IsPositive() 
  amount: number;

  @IsNotEmpty() 
  @IsString() 
  currency: string;

}
