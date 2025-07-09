import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderProfitController } from './controllers/order-profit.controller';
import { QuoteModule } from 'src/quotes/quote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), QuoteModule],
  controllers: [OrderController, OrderProfitController],
  providers: [OrderService],
})
export class OrderModule {}
