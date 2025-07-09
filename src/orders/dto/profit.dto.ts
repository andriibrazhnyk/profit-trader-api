import { ApiProperty } from '@nestjs/swagger';

export class ProfitDto {
  @ApiProperty({
    description: 'Net profit from open orders right now',
    example: 1000.0,
  })
  profit: number;
}
