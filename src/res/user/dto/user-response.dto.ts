// src/res/user/dto/user-response.dto.ts

// LoginResponseDto 클래스 정의
export class LoginResponseDto {
    message: string; // 응답 메시지
    token?: string; // JWT 토큰 (선택적)

    constructor(message: string, token?: string) {
        this.message = message; // 메시지 초기화
        this.token = token; // 토큰 초기화 (기본값은 undefined)
    }
}
