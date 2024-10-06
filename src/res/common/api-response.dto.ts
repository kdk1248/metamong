export class ApiResponse<T> {
    success: boolean;
    statusCode: number; // 필수 속성으로 변경
    message: string; // 필수 속성으로 변경
    data?: T; // 선택적 속성
    error?: string; // 선택적 속성

    constructor(success: boolean, statusCode: number, message: string, data?: T, error?: string) {
        this.success = success;
        this.statusCode = statusCode; // 필수
        this.message = message; // 필수
        this.data = data;
        this.error = error;
    }
}
