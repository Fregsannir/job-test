import { ErrorResponse } from '@common/response/error.response';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const request: Request = context.getRequest<Request>();
    const exceptionResponse: unknown = exception.getResponse();
    const statusCode: number = exception.getStatus();

    response
      .status(statusCode)
      .json(
        new ErrorResponse(
          statusCode,
          request.path,
          Date.now(),
          (exceptionResponse as Record<string, unknown>)?.message ?? exceptionResponse,
        ),
      );
  }
}
