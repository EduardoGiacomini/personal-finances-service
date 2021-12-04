import { Module } from '@nestjs/common';
import { CreateAccountController } from './create';
import { UsersPostgresRepository } from '../../../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostgresRepository])],
  controllers: [CreateAccountController],
})
export class AccountModule {}
