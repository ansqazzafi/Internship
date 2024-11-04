
# NestJS Logging Middleware

This project is a simple NestJS application that demonstrates how to create and apply a custom logging middleware. The middleware logs HTTP request details such as method, URL, and timestamp.

## Features

- Custom middleware to log requests
- Middleware applied globally or to specific routes
- Simple RESTful controller example



## Middleware Implementation

### Create the Middleware

Create a file named `log.middleware.ts` in the `src/MiddleWares` directory:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
  }
}

```

### Apply Middleware

You can apply the middleware globally or to specific routes in your `app.module.ts` file:

```typescript
// src/app.module.ts
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

```

## Example Controller

Create a controller to test the middleware functionality:

```typescript

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "response got succesfully"
  }
}

```

## Running the Application

To start the application, run:

```bash
npm run start
```
