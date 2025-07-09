import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from './config/index';
import { dataSource } from './data-source';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { QuoteModule } from './quotes/quote.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(dataSource.options),
    UserModule,
    AuthModule,
    QuoteModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
