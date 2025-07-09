import * as Joi from 'joi';
import { appConfiguration, appConfigSchema } from './app.config';
import { jwtConfigSchema, jwtConfiguration } from './jwt.config';
import { quotesConfigSchema, quotesConfiguration } from './quotes.config';

export const configOptions = {
  isGlobal: true,
  load: [appConfiguration, jwtConfiguration, quotesConfiguration],
  validationSchema: Joi.object({
    ...appConfigSchema,
    ...jwtConfigSchema,
    ...quotesConfigSchema,
  }),
};
