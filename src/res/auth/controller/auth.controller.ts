import { Body, Controller, Get, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../service/auth.service';
import { SignUpRequestDto } from '../dto/sign-up-request.dto';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import { User } from 'src/res/user/entity/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';
import { ApiResponse } from 'src/res/common/api-response.dto';
import { GetUser } from '../decorator/get-user.decorator';

@Controller('api/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    // 회원 가입 기능
    @Post('/signup')
    async signUp(@Body() signUpRequestDto: SignUpRequestDto): Promise<ApiResponse<UserResponseDto>> {
        this.logger.verbose(`Attempting to sign up user with : ${signUpRequestDto}`);
        const user = await this.authService.signUp(signUpRequestDto);
        const userResponseDto = new UserResponseDto(user);
        this.logger.verbose(`User signed up successfully: ${JSON.stringify(userResponseDto)}`);
        return new ApiResponse(true, 201, 'User signed up successfully', userResponseDto);
    }

      // 로그인 기능
    @Post('/signin')
    async signIn(@Body() signInRequestDto: SignInRequestDto, @Res() res: Response): Promise<any> {
        this.logger.verbose(`Attempting to sign in user with email: ${signInRequestDto.email}`);
        const { jwtToken, user } = await this.authService.signIn(signInRequestDto);
        const userResponseDto = new UserResponseDto(user);
        this.logger.verbose(`User signed in successfully: ${JSON.stringify(userResponseDto)}`);
    
        // JWT 토큰을 헤더에 설정
        res.setHeader('Authorization', `Bearer ${jwtToken}`);
        this.logger.verbose(`Authorization header set: Bearer ${jwtToken}`);
    
        return res.status(200).json(new ApiResponse(true, 200, 'Sign in successful', { user: userResponseDto, token: jwtToken }));
    }

    // 인증된 회원이 들어갈 수 있는 테스트 URL 경로
    @Post('/test')
    @UseGuards(AuthGuard())
    async testForAuth(@GetUser() user: User): Promise<ApiResponse<UserResponseDto>> {
        this.logger.verbose(`Authenticated user accessing test route: ${user.email}`);
        const userResponseDto = new UserResponseDto(user);
        return new ApiResponse(true, 200, 'You are authenticated', userResponseDto);
    }

    // 카카오 로그인 페이지 요청
    @Get('/kakao')
    @UseGuards(AuthGuard('kakao'))
    async kakaoLogin(@Req() req: Request) {
        // Redirect handled by AuthGuard
    }

    // 카카오 로그인 콜백 엔드포인트
    @Get('kakao/callback')
    async kakaoCallback(@Query('code') kakaoAuthResCode: string, @Res() res: Response) {
        const { jwtToken, user } = await this.authService.signInWithKakao(kakaoAuthResCode);
        const userResponseDto = new UserResponseDto(user);

        // Send JWT in the response header
        res.setHeader('Authorization', `Bearer ${jwtToken}`);
        this.logger.verbose(`User signed in successfully: ${JSON.stringify(userResponseDto)}`);
        res.status(200).json(new ApiResponse(true, 200, 'Sign in successful', { user: userResponseDto }));
    }
}
