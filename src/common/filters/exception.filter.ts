import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionResponse } from '../interfaces';
import { UniqueConstraintError } from 'sequelize';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let error: string[] | undefined;

    /* ================= Sequelize Errors ================= */
    if (exception instanceof UniqueConstraintError) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate value';
      error = exception.errors.map((e) => e.message);
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const { message: resMessage, error: resError } = res as {
          message?: string | string[];
          error?: string;
        };

        //   validation error
        if (Array.isArray(resMessage)) {
          message = 'Invalid data';
          error = resMessage;
        } else if (typeof resMessage === 'string') {
          message = resMessage;
        } else if (typeof resError === 'string') {
          message = resError;
        }
      }
    } else {
      this.logger.error(exception);
    }
    const errResponse: ExceptionResponse = {
      success: false,
      message,
      ...(error && { error }),
      path: request.url,
    };
    response.status(status).json(errResponse);
  }
}
