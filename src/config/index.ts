import * as Joi from 'joi';
import { appConfiguration, appConfigSchema } from './app.config';
import { jwtConfigSchema, jwtConfiguration } from './jwt.config';

export const configOptions = {
  isGlobal: true,
  load: [appConfiguration, jwtConfiguration],
  validationSchema: Joi.object({
    ...appConfigSchema,
    ...jwtConfigSchema,
  }),
};
