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
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CatchInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                // console.error('[Microservice Error]', error);

                const httpContext = context.switchToHttp();
                const request = httpContext.getRequest();

                let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                let errorMessage = 'An unexpected error occurred';
                let errorName = 'Internal Server Error';
                let validationErrors = null;

                // Handle microservice errors (RpcException)
                if (error instanceof RpcException) {
                    const rpcError: any = error.getError();
                    if (typeof rpcError === 'object' && rpcError !== null) {
                        statusCode = rpcError.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
                        errorMessage = rpcError.message || 'Microservice Error';
                        errorName = rpcError.error || 'Microservice Exception';
                    }
                } 
                // Handle NestJS HTTP exceptions
                else if (error instanceof HttpException) {
                    const response = error.getResponse();
                    statusCode = error.getStatus();
                    errorMessage = response['message'] || error.message;
                    errorName = response['error'] || error.name;

                    // Capture validation errors (e.g., class-validator)
                    if (Array.isArray(response['message'])) {
                        validationErrors = response['message'];
                    }
                }
                // Handle Mongoose validation errors
                else if (error.name === 'ValidationError') {
                    statusCode = HttpStatus.BAD_REQUEST;
                    errorName = 'Validation Error';
                    errorMessage = error.message || 'Validation failed for the provided data';
                    validationErrors = Object.values(error.errors).map((err: any) => err.message);
                }
                // Handle database errors (e.g., duplicate key, constraint violations)
                else if (error.code && error.code === 11000) {
                    statusCode = HttpStatus.CONFLICT;
                    errorName = 'Database Error';
                    // errorMessage = 'Duplicate entry detected';
                    const keyPattern = Object.keys(error.keyPattern || {});
                   errorMessage = `Duplicate value exists for field(s): ${keyPattern.join(', ')}`;
                }
                // Handle all other unexpected errors
                else {
                    errorMessage = error?.message || 'Internal Server Error';
                    errorName = error?.name || 'Unhandled Exception';
                }

                // Construct error response
                const errorResponse = {
                    statusCode,
                    error: errorName,
                    message: errorMessage,
                    validationErrors,
                    timestamp: new Date().toISOString(),
                    path: request?.url || 'N/A',
                };

                // return throwError(() => new HttpException(errorResponse, statusCode));
                // if (error instanceof RpcException) {
                //     const rpcError :any= error.getError();

                    return throwError(() =>
                        new RpcException({
                            statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                            error: errorResponse.error || 'Microservice Error',
                            message: errorMessage || 'An error occurred in microservice',
                            validationErrors,
                            path:errorResponse.path,
                            timestamp: new Date().toISOString(),
                        })
                    );
                // }
            }),
        );
    }
}
