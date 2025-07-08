import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [__dirname + '/../migrations/*.js'],
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: false,
});
