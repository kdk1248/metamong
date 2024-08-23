import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(signupRequestDto: SignupRequestDto): Promise<string> {
        // 이메일로 사용자 존재 여부 확인
        const existingUser = await this.userRepository.findOne({
            where: { email: signupRequestDto.email },
        });

        // 이미 존재하는 이메일인 경우 예외 처리
        if (existingUser) {
            throw new HttpException(
                'Email already exists.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // 비밀번호와 확인 비밀번호가 일치하는지 확인
        if (signupRequestDto.password !== signupRequestDto.confirmPassword) {
            throw new HttpException(
                'Passwords do not match.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(signupRequestDto.password, 10);

        // 새 사용자 생성
        const newUser = this.userRepository.create({
            name: signupRequestDto.name,
            email: signupRequestDto.email,
            phonenumber: signupRequestDto.phoneNumber,
            password: hashedPassword,
        });

        // 사용자 저장
        await this.userRepository.save(newUser);

        return 'Signup successful';
    }

    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        // 이메일로 사용자 조회
        const user = await this.userRepository.findOne({
            where: { email: loginRequestDto.email },
        });

        // 사용자가 없을 경우 예외 처리
        if (!user) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        // 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        // JWT 페이로드 생성 및 토큰 발급
        const payload = { email: user.email, name: user.name };
        const token = this.jwtService.sign(payload);

        return new LoginResponseDto('Login successful', token);
    }
}
