import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { User } from "src/res/user/entity/user.entity";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        // JWT 토큰을 헤더에서 추출하도록 설정
        super({ 
            secretOrKey: process.env.JWT_SECRET, // 검증용 Secret Key
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 JWT 토큰 추출
        });
    }

    // JWT 토큰을 검증한 후 사용자 정보 가져오기
    async validate(payload) {
        const { email } = payload;

        const user: User = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
