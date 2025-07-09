import { ApiProperty } from '@nestjs/swagger';
import { OrderSide } from '../enums/order-side.enum';
import { Order } from '../entities/order.entity';
import Big from 'big.js';

export class OrderDto {
  @ApiProperty({
    description: 'Order ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Order side',
    enum: OrderSide,
    example: OrderSide.BUY,
  })
  side: OrderSide;

  @ApiProperty({
    description: 'Forex symbol (e.g., EUR/USD, GBP/USD)',
    example: 'EUR/USD',
  })
  symbol: string;

  @ApiProperty({
    description: 'Order open price',
    example: 1.23456,
  })
  openPrice: number;

  @ApiProperty({
    description: 'Trading volume',
    example: 1000.0,
  })
  volume: number;

  @ApiProperty({
    description: 'Order creation date',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  static fromEntity(order: Order): OrderDto {
    return {
      id: order.id,
      side: order.side,
      symbol: order.symbol,
      openPrice: new Big(order.openPrice).toNumber(),
      volume: new Big(order.volume).toNumber(),
      createdAt: order.createdAt,
    };
  }
}
