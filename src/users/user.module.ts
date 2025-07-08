import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
