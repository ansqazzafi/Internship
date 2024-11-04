import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogMiddleware } from './MiddleWares/Log.middleware';
import { NestModule , MiddlewareConsumer , RequestMethod } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LogMiddleware)
    // for all routes set to globally
    // .forRoutes("*")
    // for specific route
    .forRoutes(
      { path: 'test', method: RequestMethod.GET })
  }
}
