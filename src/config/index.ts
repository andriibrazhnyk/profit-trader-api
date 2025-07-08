import * as Joi from 'joi';
import { appConfiguration, appConfigSchema } from './app.config';

export const configOptions = {
  isGlobal: true,
  load: [appConfiguration],
  validationSchema: Joi.object({
    ...appConfigSchema,
  }),
};
