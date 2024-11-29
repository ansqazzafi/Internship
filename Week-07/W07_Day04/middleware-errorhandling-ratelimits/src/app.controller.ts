import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('rate-limit')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() //  Rate limit are Applied on this route
  test(): string {
    return "Hello Test"
  }


  @SkipThrottle() // rate Limit will not be applied on this route
  @Get('skipped')
  test1(): string {
    return " Hello Test 1"
  }
}
