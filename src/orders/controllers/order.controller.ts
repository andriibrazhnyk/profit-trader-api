import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderDto } from '../dto/order.dto';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { PaginatedListDto } from 'src/common/dto/paginated-list.dto';
import { OrderListDto } from '../dto/order-list.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Success', type: OrderDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Quote not found' })
  @ApiServiceUnavailableResponse({ description: 'Service unavailable' })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: { user: JwtUser },
  ): Promise<OrderDto> {
    return this.orderService.create(createOrderDto, req.user);
  }

  @Get()
  @ApiOkResponse({ description: 'Success', type: OrderListDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async list(
    @Request() req: { user: JwtUser },
    @Query() query: FindOrdersDto,
  ): Promise<PaginatedListDto<OrderDto>> {
    return this.orderService.list(query, req.user);
  }
}
