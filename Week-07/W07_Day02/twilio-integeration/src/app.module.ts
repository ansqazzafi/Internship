import { Module } from '@nestjs/common';
import { TwilioService } from './twilio/twilio.service';
import { TwilioController } from './twilio/twilio.controller';
import { TwilioModule } from './twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),TwilioModule],
  controllers: [TwilioController],
  providers: [ TwilioService],
})
export class AppModule {}
