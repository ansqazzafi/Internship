import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from 'utility/customerror';
@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.log('CustomExceptionFilter triggered for Error!');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof CustomError ? exception.statusCode : 500;
    const message =
      exception.message || 'An error occurred in the application.';
    const data = null;
    response.status(status).json({
      statusCode: status,
      message: message,
      data: data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
