// login-response.dto.ts
export class LoginResponseDto {
    message: string;
    token?: string;

    constructor(message: string, token?: string) {
        this.message = message;
        this.token = token;
    }
}
