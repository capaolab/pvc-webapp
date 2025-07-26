'use node';
import 'reflect-metadata';

// import '@/lib/env.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from '@/core/user/user.entitie';

let options = {} as DataSourceOptions;
const migration =
  process.env.NODE_ENV === 'production' ? 'migrations' : 'migrations-dev';
const entities = [
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
];

if (process.env.NODE_ENV === 'development') {
  options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities,
  };
} else
  options = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities,
    migrations: [migration],
    synchronize: false,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  };

const dataSourceOptions: DataSourceOptions = options;

export const AppDataSource = new DataSource({
  ...dataSourceOptions,
});

export const dbConnection = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      return AppDataSource;
    } catch (err) {
      console.error('Error during Data Source initialization', err);
    }
  }
};

dbConnection();
