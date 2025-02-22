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

                // Determine if it's a microservice RPC exception
                if (error instanceof RpcException) {
                    const rpcError :any= error.getError();

                    return throwError(() =>
                        new RpcException({
                            statusCode: rpcError.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                            error: rpcError.error || 'Microservice Error',
                            message: rpcError.message || 'An error occurred in microservice',
                            timestamp: new Date().toISOString(),
                        })
                    );
                }

                // Standard NestJS HTTP Exception
                const statusCode =
                    error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

                return throwError(() =>
                    new HttpException(
                        {
                            statusCode,
                            error: error.response?.error || error.name || 'Internal Server Error',
                            message: error.response?.message || error.message || 'Unexpected error',
                            timestamp: new Date().toISOString(),
                        },
                        statusCode
                    )
                );
            }),
        );
    }
}
