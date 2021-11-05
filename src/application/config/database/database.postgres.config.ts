import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabasePostgresConfig {
  static create(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
