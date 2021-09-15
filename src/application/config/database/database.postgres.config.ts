import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabasePostgresConfig {
  static create(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'finances',
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
