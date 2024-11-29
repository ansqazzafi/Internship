import { Controller, Post, Body, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { CustomError } from 'utility/customerror';
@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) { }
  @Post()
  async sendSms(
    @Body() body: { to: string },
  ) {
    console.log("Entered");

    const { to } = body;
    try {
      const response = await this.twilioService.sendVerifcationSms(to);
      return { success: true, message: response };
    } catch (error) {
      throw new CustomError(`Failed to send SMS to ${to}. Error: ${error.message || 'Unknown error'}`, 401)
    }
  }


}
