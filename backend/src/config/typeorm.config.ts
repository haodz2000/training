import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      entities: [__dirname + '/../typeorm/entities/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + 'src/migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/../typeorm/entities/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};
