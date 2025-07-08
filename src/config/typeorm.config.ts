import * as Joi from 'joi';

export const typeormConfigSchema = {
  TYPEORM_URL: Joi.string().uri().required(),
  TYPEORM_LOGGING: Joi.boolean().default(false),
};
