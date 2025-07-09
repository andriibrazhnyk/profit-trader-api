import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QuoteDto } from '../dto/quote.dto';
import { QuotesProvider } from '../interfaces/quotes-provider.interface';
import Big from 'big.js';
import { ConfigType } from '@nestjs/config';
import { quotesConfiguration } from 'src/config/quotes.config';

interface LiveRatesResponse {
  currency: string;
  rate: string;
  bid: string;
  ask: string;
  high: string;
  low: string;
  open: string;
  close: string;
  timestamp: string;
}

interface LiveRatesErrorResponse {
  error: string;
}

interface LiveRatesQueryParams {
  key?: string;
  rate?: string;
}

type LiveRatesApiResponse = LiveRatesResponse[] | LiveRatesErrorResponse[];

@Injectable()
export class LiveRatesProvider implements QuotesProvider {
  constructor(
    private readonly httpService: HttpService,
    @Inject(quotesConfiguration.KEY)
    private readonly quoteConfig: ConfigType<typeof quotesConfiguration>,
  ) {}

  async getQuotes(): Promise<QuoteDto[]> {
    const baseUrl = 'https://live-rates.com/rates';
    const params: LiveRatesQueryParams = {
      key: this.quoteConfig.liveRatesApiKey,
    };

    const response = await firstValueFrom(
      this.httpService.get<LiveRatesApiResponse>(baseUrl, { params }),
    );

    const quotes: QuoteDto[] = [];
    const firstItem = response.data[0];

    if ('error' in firstItem) {
      throw new Error(firstItem.error);
    }

    for (const quote of response.data as LiveRatesResponse[]) {
      quotes.push({
        symbol: quote.currency,
        bid: new Big(quote.bid).toNumber(),
        ask: new Big(quote.ask).toNumber(),
      });
    }

    return quotes;
  }
}
