import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiResponse } from './interfaces';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  private getDefaultMessage(method: string) {
    switch (method) {
      case 'POST':
        return 'Created successfully';
      case 'PATCH':
        return 'Updated successfully';
      case 'GET':
        return 'Retrieved successfully';
      case 'DELETE':
        return 'Deleted successfully';

      default:
        return 'Request is completed';
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const startTime = Number(request.startTime);
    const endTime = Date.now();
    const takenTime = `${endTime - startTime}ms`;
    return next.handle().pipe(
      map((data: T) => {
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'message' in data
        ) {
          return data as ApiResponse<T>;
        }

        let messageResponse = this.getDefaultMessage(request.method);
        if (data && typeof data === 'object' && 'message' in data) {
          const { message, ...rest } = data;
          messageResponse = message as string;

          data = (Object.keys(rest).length > 0 ? rest : undefined) as T;
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const { data: record, ...rest } = data as {
            data: T;
            [key: string]: unknown;
          };
          data = record;
          if (Object.keys(rest).length > 0) {
            return {
              success: true,
              message: messageResponse,
              data,
              ...rest,
              path: request.url,
              takenTime,
            };
          }
        }

        return {
          success: true,
          message: messageResponse,
          data,
          path: request.url,
          takenTime,
        };
      }),
    );
  }
}
