import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(email: string, password: string) {
    const user = await this.auth.validateCred(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
