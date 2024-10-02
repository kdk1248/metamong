import { Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../service/user.service';
import { LoginRequestDto, SignupRequestDto } from '../dto/user-request.dto';
import { LoginResponseDto } from '../dto/user-response.dto';
import { User } from '../entity/user.entity';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    @Post('signups')
    async signup(@Body() request: SignupRequestDto): Promise<LoginResponseDto> {
        const existingUser = await this.userService.findUserByEmail(request.email);
        if (existingUser) {
            throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
        }

        if (request.password !== request.confirmPassword) {
            throw new HttpException('Passwords do not match.', HttpStatus.BAD_REQUEST);
        }

        return await new LoginResponseDto('Signup successful', '');
    }

    @Post('logins')
    async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userService.findUserByEmail(request.email);
        if (!user) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, username: user.username }; // username을 사용
        const token = this.jwtService.sign(payload);

        return new LoginResponseDto('Login successful', token);
    }

    @Get('mypage/:email') // 이메일을 URL 파라미터로 받음
    async getUserByEmail(@Param('email') email: string): Promise<{ username: string; email: string } | HttpException> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        
        // username과 email만 반환
        return {
            username: user.username,
            email: user.email,
        };
    }
}
