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
    private readonly logger = new Logger(AuthController.name); // Logger 인스턴스 생성

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
    async signIn(@Body() signInRequestDto: SignInRequestDto, @Res() res: Response): Promise<void> {
        this.logger.verbose(`Attempting to sign in user with email: ${signInRequestDto.email}`);
        const { jwtToken, user } = await this.authService.signIn(signInRequestDto);
        const userResponseDto = new UserResponseDto(user);
        this.logger.verbose(`User signed in successfully: ${JSON.stringify(userResponseDto)}`);

        // [3] 쿠키 설정
        res.cookie('Authorization', jwtToken, {
            httpOnly: true, // 클라이언트 측 스크립트에서 쿠키 접근 금지
            secure: false, // HTTPS에서만 쿠키 전송, 임시 비활성화
            maxAge: 3600000, // 1시간
            sameSite: 'none', // CSRF 공격 방어
        });

        res.status(200).json(new ApiResponse(true, 200, 'Sign in successful', { jwtToken, user: userResponseDto }));
    }

    @Post('/logout')
@UseGuards(AuthGuard()) // 인증된 사용자만 접근 가능
async logout(@GetUser() user: User, @Res() res: Response): Promise<void> {
    this.logger.verbose(`User logging out: ${user.email}`);
    
    // 로그아웃 처리 로직 (예: 쿠키 삭제 등)
    res.clearCookie('Authorization');

    // ApiResponse 객체 생성
    const response = new ApiResponse(true, 200, 'Logout successful', null);

    // 응답 반환
    res.status(response.statusCode).json(response); // Response 객체에 JSON 형태로 반환
}


    // 인증된 회원이 들어갈 수 있는 테스트 URL 경로
    @Post('/test')
    @UseGuards(AuthGuard()) // @UseGuards : 핸들러는 지정한 인증 가드가 적용됨 -> AuthGuard()의 'jwt'는 기본값으로 생략가능
    async testForAuth(@GetUser() user: User): Promise<ApiResponse<UserResponseDto>> {
        this.logger.verbose(`Authenticated user accessing test route: ${user.email}`);
        const userResponseDto = new UserResponseDto(user);
        return new ApiResponse(true, 200, 'You are authenticated', userResponseDto);
    }

    // 카카오 로그인 페이지 요청
    @Get('/kakao')
    @UseGuards(AuthGuard('kakao'))
    async kakaoLogin(@Req() req: Request) {
      // 이 부분은 Passport의 AuthGuard에 의해 카카오 로그인 페이지로 리다이렉트
    }

    // 카카오 로그인 콜백 엔드포인트
    @Get('kakao/callback')
    async kakaoCallback(@Query('code') kakaoAuthResCode: string, @Res() res: Response) {  // Authorization Code 받기
        const { jwtToken, user } = await this.authService.signInWithKakao(kakaoAuthResCode);
    
        // 쿠키에 JWT 설정
        res.cookie('Authorization', jwtToken, {
            httpOnly: true, // 클라이언트 측 스크립트에서 쿠키 접근 금지
            secure: false, // HTTPS에서만 쿠키 전송, 임시 비활성화
            maxAge: 3600000, // 1시간
            // sameSite: 'none', // CSRF 공격 방어
        });
        const userResponseDto = new UserResponseDto(user);

        this.logger.verbose(`User signed in successfully: ${JSON.stringify(userResponseDto)}`);
        res.status(200).json(new ApiResponse(true, 200, 'Sign in successful', { jwtToken, user: userResponseDto }));
    }
}
