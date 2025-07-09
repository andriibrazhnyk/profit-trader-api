import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { ConfigType } from './type.enum';
import { QuoteProvider } from '../quotes/enums/quote.enum';

export const quotesConfigSchema = {
  QUOTE_PROVIDER: Joi.string()
    .valid(QuoteProvider.LIVE_RATES, QuoteProvider.FAKE)
    .default(QuoteProvider.FAKE),
  LIVE_RATES_API_KEY: Joi.string(),
};

export const quotesConfiguration = registerAs(ConfigType.QUOTES, () => ({
  provider: process.env.QUOTE_PROVIDER as QuoteProvider,
  liveRatesApiKey: process.env.LIVE_RATES_API_KEY,
}));
