import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuoteService } from './services/quote.service';
import { QuoteDto } from './dto/quote.dto';

@ApiTags('Quotes')
@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  @ApiOkResponse({ description: 'Success', type: [QuoteDto] })
  @ApiServiceUnavailableResponse({ description: 'Service Unavailable' })
  async getQuotes(): Promise<QuoteDto[]> {
    return this.quoteService.getQuotes();
  }
}
