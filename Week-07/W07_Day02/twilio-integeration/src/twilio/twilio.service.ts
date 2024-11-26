import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN;  

    this.twilioClient = Twilio(accountSid, authToken);
  }

  async sendVerifcationSms(to: string) {
    try {
      const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      const message = `Your Verification code are : ${randomNumber}`
      const response = await this.twilioClient.messages.create({
        body:message,
        from: process.env.TWILIO_PHONE_NUMBER, 
        to,
      });
      return response;
    } catch (error) {
      console.error('Error during sending SMS:', error);
      throw new Error('Failed to send SMS to receiver');
    }
  }



  async makeVoiceCall(to: string, url: string) {
    try {
      const call = await this.twilioClient.calls.create({
        to,              
        from: process.env.TWILIO_PHONE_NUMBER,
        url,             
      });
      return call;
    } catch (error) {
      console.error('Error during voice call:', error);
      throw new Error('Failed to create a voice call');
    }
  }
}
