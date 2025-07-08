import { Repository } from 'typeorm';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { TokenResponseDto } from '../dto/token-response.dto';
import { IHashService } from 'src/hash/hash.interface';
import { jwtConfiguration } from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('HASH_SERVICE')
    private hashService: IHashService,
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({ email: body.email });

    if (!user?.password) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isPasswordValid = await this.hashService.verify(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.createAccessToken(user);
  }

  private createAccessToken(user: User): TokenResponseDto {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtConfig.accessTokenTtl,
    });

    return { accessToken };
  }
}
