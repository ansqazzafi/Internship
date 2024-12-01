import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { CustomError } from 'utility/customerror';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    this.twilioClient = Twilio(accountSid, authToken);
  }

  async SendConfirmationSms(to: string, message: string) {
    try {
      console.log('Entered In twilio');

      const response = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
      return response;
    } catch (error) {
      console.error('Error during sending SMS:', error);
      throw new CustomError('Failed to send SMS to receiver', 404);
    }
  }
}
