import { IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  name: string;
}
