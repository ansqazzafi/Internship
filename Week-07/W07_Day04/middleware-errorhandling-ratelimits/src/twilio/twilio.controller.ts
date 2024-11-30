import { Controller, Post, Body, Get } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { CustomError } from 'utility/customerror';
import { SkipThrottle } from '@nestjs/throttler';
@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}
  @Post()
  async sendSms(@Body() body: { to: string }) {
    console.log('Entered');

    const { to } = body;
    try {
      const response = await this.twilioService.sendVerifcationSms(to);
      return { success: true, message: response };
    } catch (error) {
      throw new CustomError(
        `Failed to send SMS to ${to}. Error: ${error.message || 'Unknown error'}`,
        401,
      );
    }
  }

  @SkipThrottle() // Rate Limit will not be applied on this routes it will work on all other routes because it set to be globaly
  @Get()
  async testRateLimit() {
    return `Hello`;
  }
}
