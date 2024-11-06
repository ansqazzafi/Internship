import { Body, Controller,Get , Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './role.guard';
import { LogInterceptor } from './log.interceptor';
import { TransformResponseInterceptor } from './transformResponse.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(RoleGuard) 
  @Post('checkAuthorized')
  sayHello(@Body() body: { user: string }): string {
    console.log("Body :",body);
    return 'Hello, Admin';  
  }


  @UseInterceptors(LogInterceptor)
  @Get()
  Print():string{
    return "End Point Hits"
  }


  @UseInterceptors(TransformResponseInterceptor)
  @Post('printUserDetails')
  printDetails(@Body() user:object){
    return user
  }

}
