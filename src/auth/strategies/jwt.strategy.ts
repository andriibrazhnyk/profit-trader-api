import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { jwtConfiguration } from 'src/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfiguration.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtUser): Promise<JwtUser> {
    return payload;
  }
}
