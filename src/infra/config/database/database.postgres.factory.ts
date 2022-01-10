import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_URL } from '../environment';

export class DatabasePostgresFactory {
  static create(): TypeOrmModuleOptions {
    console.log(DATABASE_URL);
    return {
      type: 'postgres',
      url: DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
