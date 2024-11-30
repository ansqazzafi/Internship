import { Module } from '@nestjs/common';
import { TwilioController } from './twilio.controller';
import { TwilioService } from './twilio.service';

@Module({
  imports: [],
  controllers: [TwilioController],
  providers: [TwilioService],
})
export class TwilioModule {}
