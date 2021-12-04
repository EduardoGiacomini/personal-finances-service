import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {
  InvalidEmailException,
  InvalidPasswordException,
} from '../../../domain/exceptions/user';

@Catch(InvalidEmailException, InvalidPasswordException)
export class InvalidExceptionFilter implements ExceptionFilter {
  catch(
    exception: InvalidEmailException | InvalidPasswordException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();
    const { message, code } = exception;
    const status = 404;

    response.status(status).json({ status, message, code });
  }
}
