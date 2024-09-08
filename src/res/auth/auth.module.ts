import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios'; // 추가된 부분
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/jwt.strategy';
// import { KakaoStrategy } from './strategy/kakao.strategy';
import { User } from '../user/entity/user.entity';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
      },
    }),
    TypeOrmModule.forFeature([User]),
    HttpModule, // HttpModule 추가
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
