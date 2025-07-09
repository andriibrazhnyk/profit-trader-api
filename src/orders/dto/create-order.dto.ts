import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { OrderSide } from '../enums/order-side.enum';

export class CreateOrderDto {
  @ApiProperty({
    enum: OrderSide,
    example: OrderSide.BUY,
  })
  @IsEnum(OrderSide)
  @IsNotEmpty()
  side: OrderSide;

  @ApiProperty({
    description: 'Forex symbol (e.g., EUR/USD, GBP/USD)',
    example: 'EUR/USD',
  })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({
    description: 'Trading volume',
    example: 1000.0,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  volume: number;
}
