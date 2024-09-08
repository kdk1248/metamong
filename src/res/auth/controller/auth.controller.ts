import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginUserDto } from '../dto/login-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // 로그인
  @UseGuards(LocalAuthGuard)  // Local 전략을 사용하여 로그인 검증
  @Post('login')
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user); // 로그인 성공 시 JWT 토큰 반환
  }

  // JWT 검증이 필요한 보호된 라우트 예시
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user; // JWT로부터 인증된 사용자 정보 반환
  }
}
