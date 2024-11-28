import { Module } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { StripeController } from './stripe/stripe.controller';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StripeModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class AppModule {}
