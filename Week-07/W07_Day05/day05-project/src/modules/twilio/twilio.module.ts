import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Module({
  imports: [],
  providers: [TwilioService],
  controllers: [],
})
export class TwilioModule {}
