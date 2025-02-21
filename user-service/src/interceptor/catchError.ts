import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CatchInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                const httpContext = context.switchToHttp();
                const response = httpContext.getResponse();
                const request = httpContext.getRequest();

                // Determine the status code
                const statusCode =
                    error instanceof HttpException
                        ? error.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                // Standardized error response
                const errorResponse = {
                    statusCode,
                    error: error.response?.error || error.name || 'Internal Server Error',
                    message:
                        error.response?.message || error.message || 'An unexpected error occurred',
                    data: null, // Explicitly include 'data' as null for all errors
                    timestamp: new Date().toISOString(),
                    path: request.url,
                };

                // Optionally log the error for debugging (if required)
                console.error(`[Error] ${JSON.stringify(errorResponse)}`);

                // Re-throw the error with a consistent format
                return throwError(() => new HttpException(errorResponse, statusCode));
            }),
        );
    }
}
