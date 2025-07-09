import { QuoteDto } from '../dto/quote.dto';

export interface QuotesProvider {
  getQuotes(): Promise<QuoteDto[]>;
}
