// user-request.dto.ts

export class LoginRequestDto {
    email: string;
    password: string;
}

export class SignupRequestDto {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}
