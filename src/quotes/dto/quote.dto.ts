import { ApiProperty } from '@nestjs/swagger';

export class QuoteDto {
  @ApiProperty({ description: 'Currency pair symbol (e.g., EUR/USD)' })
  symbol: string;

  @ApiProperty({ description: 'Bid price' })
  bid: number;

  @ApiProperty({ description: 'Ask price' })
  ask: number;
}
