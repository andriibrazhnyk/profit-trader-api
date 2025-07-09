import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalPages: number;
}
