import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOptions } from './config/index';
import { dataSource } from './data-source';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot(dataSource.options),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
