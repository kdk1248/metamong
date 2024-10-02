// user-request.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class SignupRequestDto {
    @IsNotEmpty()
    @IsString()
    username: string; // name을 username으로 변경

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6) // 비밀번호 최소 길이 설정
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}
