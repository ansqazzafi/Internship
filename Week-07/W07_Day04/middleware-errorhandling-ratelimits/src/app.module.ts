import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorHandlingMiddleware } from 'middlewares/errorhandle.middleware';
import { ConfigModule } from '@nestjs/config';
import { TwilioController } from './twilio/twilio.controller';
import { TwilioService } from './twilio/twilio.service';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  controllers: [AppController , TwilioController , StripeController],
  providers: [AppService , TwilioService , StripeService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}
