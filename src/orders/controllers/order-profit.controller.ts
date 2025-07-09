import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { ProfitDto } from '../dto/profit.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtGuard)
export class OrderProfitController {
  constructor(private readonly orderService: OrderService) {}

  @Get('profit')
  @ApiOkResponse({ description: 'Success', type: ProfitDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Quote not found' })
  @ApiServiceUnavailableResponse({ description: 'Service unavailable' })
  async profit(@Request() req: { user: JwtUser }): Promise<ProfitDto> {
    return this.orderService.calculateUserProfit(req.user);
  }
}
