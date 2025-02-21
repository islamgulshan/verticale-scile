import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || 200;

        // Handle cases where the response contains an error status code
        if (data?.statusCode >= 400) {
          // Microservice returned an error; propagate it
          throw new HttpException(
            {
              statusCode: data.statusCode,
              message: data.message || data.error || 'An error occurred',
              data: data.data || null,
            },
            data.statusCode,
          );
        }

        // Handle successful responses
        return {
          ...(data.data|| data),
          statusCode: statusCode,
          message: data?.message || 'Success',
          data: data?.data !== undefined ? data.data : data,
        };
      }),
    );
  }
}
