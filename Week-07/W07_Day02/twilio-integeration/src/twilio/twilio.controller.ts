import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}


  //integerated End point with Twilio sending verification code to sms
  @Post()
  async sendSms(
    @Body() body: { to: string },
  ) {
    const { to } = body;
    try {
      const response = await this.twilioService.sendVerifcationSms(to);
      return { success: true, message: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

   //integerated End point with Twilio making voice call
  @Post('make-call')
  async makeVoiceCall(
    @Body() body: { to: string },
  ) {
    const { to } = body;
    const url = 'http://demo.twilio.com/docs/voice.xml';

    try {
      const response = await this.twilioService.makeVoiceCall(to, url);
      return { success: true, message: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
