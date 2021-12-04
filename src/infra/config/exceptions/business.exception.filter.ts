import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user';

@Catch(UserAlreadyExistsException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: UserAlreadyExistsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { message, code } = exception;
    const status = 400;

    response.status(status).json({ status, message, code });
  }
}
