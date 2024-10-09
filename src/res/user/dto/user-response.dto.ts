// src/res/user/dto/user-response.dto.ts

// LoginResponseDto 클래스 정의
export class LoginResponseDto {
    username:string;
    message: string; // 응답 메시지
    token?: string; // JWT 토큰 (선택적)

    constructor(username:string, message: string, token?: string) {
        this.username = username;
        this.message = message; // 메시지 초기화
        this.token = token; // 토큰 초기화 (기본값은 undefined)
    }
}
