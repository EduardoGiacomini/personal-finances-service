import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate';
import { CreateAccountController } from './create';
import { UsersPostgresRepository } from '../../../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostgresRepository])],
  controllers: [AuthenticateController, CreateAccountController],
})
export class AccountModule {}
