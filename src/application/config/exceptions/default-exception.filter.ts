import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { DefaultBusinessException } from '../../../core/exceptions/default.business.exception';

@Catch(DefaultBusinessException)
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: DefaultBusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = 400;

    response.status(status).json({ status, message });
  }
}
