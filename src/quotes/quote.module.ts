import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { QuoteController } from './quote.controller';
import { QuoteService } from './services/quote.service';
import { FakeProvider } from './providers/fake.provider';
import { QUOTES_PROVIDER } from './constants';
import { QuoteProvider } from './enums/quote.enum';
import { LiveRatesProvider } from './providers/live-rates.provider';
import { HttpService } from '@nestjs/axios';
import { quotesConfiguration } from 'src/config/quotes.config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [QuoteController],
  providers: [
    QuoteService,
    LiveRatesProvider,
    FakeProvider,
    {
      provide: QUOTES_PROVIDER,
      useFactory: (
        quoteConfig: ConfigType<typeof quotesConfiguration>,
        httpService: HttpService,
      ) => {
        return quoteConfig.provider === QuoteProvider.LIVE_RATES
          ? new LiveRatesProvider(httpService)
          : new FakeProvider();
      },
      inject: [quotesConfiguration.KEY, HttpService],
    },
  ],
  exports: [QuoteService],
})
export class QuoteModule {}
