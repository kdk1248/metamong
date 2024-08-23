// user.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'yourSecretKey', // 실제로는 환경변수나 ConfigService를 사용하여 관리
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
