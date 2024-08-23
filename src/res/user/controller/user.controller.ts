import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Controller('api')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signup(@Body() request: SignupRequestDto): Promise<string> {
        return this.userService.signup(request);
    }

    @Post('login')
    async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
        return this.userService.login(request);
    }
}
