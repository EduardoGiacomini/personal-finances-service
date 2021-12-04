import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { UsersPostgresRepository } from '../../../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostgresRepository])],
  controllers: [AccountController],
})
export class AccountModule {}
