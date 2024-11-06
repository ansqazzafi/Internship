import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); 

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const duration = Date.now() - now;
        const method = request.method;
        const url = request.url;
        const statusCode = response.statusCode;
        console.log(`${method} ${url} - ${statusCode} - ${duration}ms`);
      }),
    );
  }
}
