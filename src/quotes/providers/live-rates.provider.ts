import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QuoteDto } from '../dto/quote.dto';
import { QuotesProvider } from '../interfaces/quotes-provider.interface';
import Big from 'big.js';

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

type LiveRatesApiResponse = LiveRatesResponse[] | LiveRatesErrorResponse[];

@Injectable()
export class LiveRatesProvider implements QuotesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getQuotes(): Promise<QuoteDto[]> {
    const baseUrl = 'https://live-rates.com/rates';

    const response = await firstValueFrom(
      this.httpService.get<LiveRatesApiResponse>(baseUrl),
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
