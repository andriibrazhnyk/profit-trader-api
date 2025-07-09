import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max, IsPositive } from 'class-validator';

export class FindOrdersDto {
  static readonly page = 1;
  static readonly perPage = 50;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number = FindOrdersDto.page;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  perPage?: number = FindOrdersDto.perPage;

  skip(): number {
    const page = this.page ?? FindOrdersDto.page;
    const perPage = this.perPage ?? FindOrdersDto.perPage;
    return (page - 1) * perPage;
  }
}
