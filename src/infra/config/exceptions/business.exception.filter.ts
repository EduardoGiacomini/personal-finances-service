import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import {
  UserAlreadyExistsException,
  EmailOrPasswordInvalidException,
} from '../../../domain/exceptions/user';

@Catch(UserAlreadyExistsException, EmailOrPasswordInvalidException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(
    exception: UserAlreadyExistsException | EmailOrPasswordInvalidException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();
    const { message, code } = exception;
    const status = 400;

    response.status(status).json({ status, message, code });
  }
}
