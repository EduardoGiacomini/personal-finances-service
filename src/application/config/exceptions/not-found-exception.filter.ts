import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundBusinessException } from '../../../core/exceptions/not-found.business.exception';

@Catch(NotFoundBusinessException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundBusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = 404;

    response.status(status).json({ status, message });
  }
}
