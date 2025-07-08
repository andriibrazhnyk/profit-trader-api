import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { HashModule } from 'src/hash/hash.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { jwtConfiguration } from 'src/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (jwtConfig: ConfigType<typeof jwtConfiguration>) => ({
        secret: jwtConfig.secret,
      }),
      inject: [jwtConfiguration.KEY],
    }),
    HashModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
