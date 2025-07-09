import { PaginatedListDto } from 'src/common/dto/paginated-list.dto';
import { OrderDto } from './order.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class OrderListDto extends OmitType(PaginatedListDto<OrderDto>, [
  'data',
]) {
  @ApiProperty({
    description: 'List of orders',
    type: [OrderDto],
  })
  data: OrderDto[];
}
