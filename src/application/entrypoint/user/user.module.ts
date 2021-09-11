import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersPostgresRepository } from '../../data-providers/user/users.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostgresRepository])],
  controllers: [UserController],
})
export class UserModule {}
