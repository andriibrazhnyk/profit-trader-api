import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { ConfigType } from './type.enum';

export const jwtConfigSchema = {
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string().default('5m'),
};

export const jwtConfiguration = registerAs(ConfigType.JWT, () => ({
  secret: process.env.JWT_SECRET || '',
  accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL || '',
}));
