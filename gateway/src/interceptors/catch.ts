import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CatchInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                console.error('[Gateway Error]', error.message);

                const httpContext = context.switchToHttp();
                const request = httpContext.getRequest();

                let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                let errorMessage = 'Internal Server Error';
                let errorName = 'Unknown Error';

                // If the error comes from a microservice (RpcException)
                if (error instanceof RpcException) {
                    const rpcError: any = error.getError();
                    if (typeof rpcError === 'object' && rpcError !== null) {
                        statusCode = rpcError.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
                        errorMessage = rpcError.message || 'Microservice Error';
                        errorName = rpcError.error || 'Microservice Exception';
                    }
                } 
                // If it's an HTTP exception
                else if (error instanceof HttpException) {
                    statusCode = error.getStatus();
                    const response = error.getResponse();

                    // Properly handling validation errors
                    if (error instanceof BadRequestException) {
                        if (typeof response === 'object' && response !== null) {
                            errorMessage = response['message'] || 'Validation failed';
                        } else {
                            errorMessage = error.message;
                        }
                    } else {
                        errorMessage = error.message;
                        errorName = error.name;
                    }
                } 
                // Handle unexpected errors
                else {
                    errorMessage = error?.message || 'An unexpected error occurred';
                    statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
                }

                // Error response object
                const errorResponse = {
                    statusCode,
                    message: errorMessage,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                };

                return throwError(() => new HttpException(errorResponse, statusCode));
            }),
        );
    }
}
