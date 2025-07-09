import Big from 'big.js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { FindOrdersDto } from '../dto/find-orders.dto';
import { PaginatedListDto } from 'src/common/dto/paginated-list.dto';
import { OrderDto } from '../dto/order.dto';
import { paginate } from 'src/common/utils/paginate.utils';
import { QuoteService } from 'src/quotes/services/quote.service';
import { QuoteDto } from 'src/quotes/dto/quote.dto';
import { ProfitDto } from '../dto/profit.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private quoteService: QuoteService,
  ) {}

  async create(body: CreateOrderDto, user: JwtUser): Promise<OrderDto> {
    const quote = await this.quoteService.findQuoteOrFail(body.symbol);
    const openPrice = this.quoteService.openPrice(quote, body.side);

    const order = this.orderRepository.create({
      side: body.side,
      symbol: body.symbol,
      openPrice: new Big(openPrice).toNumber(),
      volume: new Big(body.volume).toNumber(),
      userId: user.id,
    });

    await this.orderRepository.save(order);

    return OrderDto.fromEntity(order);
  }

  async list(
    query: FindOrdersDto,
    user: JwtUser,
  ): Promise<PaginatedListDto<OrderDto>> {
    const perPage = query.perPage ?? 10;
    const page = query.page ?? 1;

    const [orders, total] = await this.orderRepository.findAndCount({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      skip: query.skip(),
      take: perPage,
    });

    return {
      data: orders.map((order) => OrderDto.fromEntity(order)),
      ...paginate(page, perPage, total),
    };
  }

  async calculateUserProfit(user: JwtUser): Promise<ProfitDto> {
    const quotes = await this.quoteService.getQuotes();
    const orders = await this.orderRepository.find({
      where: { userId: user.id },
    });

    let profit = new Big(0);
    const cachedQuotes = new Map<string, QuoteDto>();

    for (const order of orders) {
      let quote = cachedQuotes.get(order.symbol);

      if (!quote) {
        quote = await this.quoteService.findQuoteOrFail(order.symbol, quotes);

        cachedQuotes.set(order.symbol, quote);
      }

      profit = profit.plus(this.calculateOrderProfit(order, quote));
    }

    return {
      profit: profit.toNumber(),
    };
  }

  private calculateOrderProfit(order: Order, quote: QuoteDto): Big {
    const volume = new Big(order.volume);
    const openPrice = new Big(order.openPrice);
    const closePrice = new Big(this.quoteService.closePrice(quote, order.side));

    return volume.times(closePrice.minus(openPrice));
  }
}
