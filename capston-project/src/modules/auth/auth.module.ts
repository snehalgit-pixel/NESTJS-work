import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import LocalStrategy from './local.strategy';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
import { JwtStrategy } from './jwt.strategy';
import { Auth } from './entities/auth.entity';

const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return { secret: appConfig().appSecret, signOptions: { expiresIn: '1d' } };
  },
};

@Module({
  imports: [Auth, UserModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
