import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DevDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Disable in production
  logging: process.env.NODE_ENV === 'development',
  namingStrategy: new SnakeNamingStrategy(),
});

DevDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
