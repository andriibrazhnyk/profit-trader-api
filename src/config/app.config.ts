import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { ConfigType } from './type.enum';

export const appConfigSchema = {
  APP_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  APP_PORT: Joi.number().port().default(8000),
};

export const appConfiguration = registerAs(ConfigType.APP, () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
}));
