import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { QuoteDto } from '../dto/quote.dto';
import { QUOTES_PROVIDER } from '../constants';
import { QuotesProvider } from '../interfaces/quotes-provider.interface';
import { OrderSide } from 'src/orders/enums/order-side.enum';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  constructor(
    @Inject(QUOTES_PROVIDER)
    private readonly quoteProvider: QuotesProvider,
  ) {}

  async getQuotes(): Promise<QuoteDto[]> {
    try {
      const quotes = await this.quoteProvider.getQuotes();
      return quotes;
    } catch (error) {
      this.logger.error(error);
      throw new ServiceUnavailableException('Try another quotes provider');
    }
  }

  async findQuoteOrFail(
    symbol: string,
    quotes?: QuoteDto[],
  ): Promise<QuoteDto> {
    if (!quotes) {
      quotes = await this.getQuotes();
    }

    const quote = quotes.find((q) => q.symbol === symbol);

    if (!quote) {
      throw new NotFoundException(`Quote not found for symbol: ${symbol}`);
    }

    return quote;
  }

  openPrice(quote: QuoteDto, side: OrderSide): number {
    return side === OrderSide.BUY ? quote.ask : quote.bid;
  }

  closePrice(quote: QuoteDto, side: OrderSide): number {
    return side === OrderSide.BUY ? quote.bid : quote.ask;
  }
}
