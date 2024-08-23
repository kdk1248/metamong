// login-request.dto.ts
export class LoginRequestDto {
    password(_password: any, _password1: any) {
        throw new Error('Method not implemented.');
    }
    email: string;
    number: string;
}